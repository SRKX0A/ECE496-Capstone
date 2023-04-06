const download = (blob: Blob, title:string) => {
    
    const href = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', title);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export default download