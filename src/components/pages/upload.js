import './upload.css';
import { Link } from 'react-router-dom';
import upload_img from '../assets/Header/upload.png';

const Upload = () => {



  return (
    <div className='upload_main'>
      <h4>Submit to Unsplash</h4>
      <p><Link to={'https://help.unsplash.com/en/articles/2610243-upload-a-photo-to-unsplash'}>Need help?</Link></p>
      <input
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        id="upload-input"
      />
      <div className='para_img_upload' onClick={() => document.getElementById('upload-input').click()}>
        <img src={upload_img} alt="" className='img_upload' />
        <p className='upload_para'>Drag and drop up to 10 photos<br />
          or <span>browse</span> to choose a file
        </p>
      </div>
    </div>
  )
};

export default Upload;
