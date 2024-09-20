import { useState } from 'react';

export default function PreviewImage({file}) {

    const [imgs, setImgs] = useState({});
    console.log(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setImgs(reader.result);
        console.log(imgs);
    }

    return (
        <div>
            <img style={{ width: '300px', height: '300px' }} src={imgs} alt=""/>
        </div>
    )
}