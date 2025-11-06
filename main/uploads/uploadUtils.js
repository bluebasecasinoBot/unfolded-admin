import { __p, __v } from "../../sydneyDom_v3.js";
import { updateState, updateState__bulk } from "../../utils/stateAssets.js";

class newAsset{
    constructor({image = null , height = null , width = null , size = null , name = null , percentComplete = 0 , ext = null})
    {
        this.image = image;
        this.height = height;
        this.width = width;
        this.size = size;
        this.name = name;
        this.percentComplete = percentComplete;
        this.ext = ext
    }
}

let uploadQueue = [];
let activeUploads = 0;
const MAX_CONCURRENT_UPLOADS = 3;

export const initFileInput = () => {
    // Handle file selection
    __v["uploadFileInput"].addEventListener('change', async (e) => {
        const files = Array.from(e.target.files);
        
        if (files.length === 0) return;
        
        console.log(`📁 Selected ${files.length} images`);
        
        // Filter only images
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        
        if (imageFiles.length !== files.length) {
            console.warn(`⚠️ Filtered out ${files.length - imageFiles.length} non-image files`);
        }
        
        // Add to upload queue
        uploadQueue.push(...imageFiles);
        const assets = uploadQueue.map(val => new newAsset({size:val.size / 1024}) /* in kbs */);

        updateState__bulk({name:"canvasMain_uploads",task:s =>{
            s.assets.push(...assets);
            return s;
        }})

        // Start processing queue
        processUploadQueue();
    });

    async function processUploadQueue() {
        while (uploadQueue.length > 0 && activeUploads < MAX_CONCURRENT_UPLOADS) {
            const file = uploadQueue.shift();
            const currentIndex = __p(["canvasMain_uploads","assets"],[]).length - uploadQueue.length - 1;
            activeUploads++;
            
            processSingleFile(file, currentIndex).finally(() => {
                activeUploads--;
                processUploadQueue(); // Process next in queue
            });
        }
    }

    // Process individual file with progress
    function processSingleFile(file, index) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            
            // Progress tracking
            fileReader.onprogress = (e) => {
                if (e.lengthComputable) {
                    const percentComplete = (e.loaded / e.total) * 100;

                    updateState__bulk({name:"canvasMain_uploads",task:s =>{
                        s.assets[index].percentComplete = percentComplete;
                        return s;
                    }})
                }
            };
            
            // Load complete
            fileReader.onload = (e) => {
                const image = new Image();
                
                image.onload = () => {
                    updateState__bulk({name:"canvasMain_uploads",task:s =>{
                        s.assets[index].image = image;
                        s.assets[index].name = file.name;
                        s.assets[index].height = image.height;
                        s.assets[index].width = image.width;
                        s.assets[index].ext = file.name.split('.').pop().toLowerCase();
                        s.assets[index].percentComplete = 100;
                        return s;
                    }})
                    resolve(); // ✅ Resolve when complete
                };
                
                image.onerror = () => {
                    console.error(`Failed to load image: ${file.name}`);
                    reject(new Error(`Failed to load image: ${file.name}`));
                };
                
                image.src = e.target.result;
            };
            
            fileReader.onerror = () => {
                console.error(`Failed to read file: ${file.name}`);
                reject(new Error(`Failed to read file: ${file.name}`));
            };
            
            fileReader.readAsDataURL(file);
        });
    }
}