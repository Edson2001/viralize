export default function isImageURL(url: string){
    const formats = ['.png', '.svg', '.webep', '.jpg', 'jpeg']
    let formatReturn = false
    formats.forEach(item=>{
        if(url.includes(item)){  
            formatReturn = true
        }
    }) 
    return formatReturn
}