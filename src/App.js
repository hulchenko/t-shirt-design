import './App.css';
import { app, storage } from './firebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import React, { useState, useEffect } from 'react';
import blackShirt from './img/black-shirt.jpg';
import greenShirt from './img/green-shirt.jpg';
import whiteShirt from './img/white-shirt.jpg';
import redShirt from './img/red-shirt.jpg';
import blackSweater from './img/black-sweater.jpg';
import pinkSweater from './img/pink-sweater.jpg';
import whiteSweater from './img/white-sweater.jpg';
import yellowSweater from './img/yellow-sweater.jpg';

function App() {
  const outfitType = ['shirt', 'sweater'];
  const shirtMaterialType = ['light-cotton', 'heavy-cotton'];
  const shirtColors = ['white', 'black', 'green', 'red'];
  const sweaterColors = ['white', 'black', 'pink', 'yellow'];

  const [outfit, setOutfit] = useState('shirt');
  const [outfitMaterial, setOutfitMaterial] = useState('light-cotton');
  const [outfitColor, setOutfitColor] = useState('white');
  const [outfitImage, setOutfitImage] = useState(whiteShirt);
  const [outfitText, setOutfitText] = useState();
  const [logoName, setLogoName] = useState(null);
  const [logoImage, setLogoImage] = useState(null);
  const [textColor, setTextColor] = useState('black');
  const [total, setTotal] = useState(null);
  const [summary, setSummary] = useState(null);

  const outfitHandler = (event) => {
    setOutfit(event.target.value);
    if (event.target.value !== 'shirt') {
      setOutfitMaterial('default');
      setTotal({ ...total, base: '28.95' });
    } else {
      setOutfitMaterial('light-cotton');
      setTotal({ ...total, base: '16.95' });
    }
  };

  const outfitMaterialHandler = (event) => {
    setOutfitMaterial(event.target.value);
    if (event.target.value !== 'light-cotton') {
      setTotal({ ...total, material: '3' });
    } else {
      setTotal({ ...total, material: '0' });
    }
  };

  const outfitColorHandler = (event) => {
    setOutfitColor(event.target.value);
  };

  const inputHandler = (event) => {
    setOutfitText(event.target.value);
  };

  const fileUploadHandler = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, file.name);
    uploadBytes(storageRef, file).then(() => {
      console.log('Uploaded..');
    });
    setLogoName(file.name);
  };

  const fileDownloadHandler = () => {
    // const url = `gs://uploadimage-ab683.appspot.com/${logoName}`;
    getDownloadURL(ref(storage, logoName)).then((url) => {
      setLogoImage(url);
    });
    // .then((res) => console.log(res));
    setTotal({ ...total, logo: '10' });
  };

  const radioButtonsHandler = (event) => {
    console.log(event.target.value);
    setTextColor(event.target.value);
    if (event.target.value !== 'white' && event.target.value !== 'black') {
      setTotal({ ...total, textColor: '3' });
    } else {
      setTotal({ ...total, textColor: '0' });
    }
  };

  useEffect(() => {
    if (logoName !== null) {
      setTimeout(() => fileDownloadHandler(), 2000);
    }
  }, [logoName]);

  useEffect(() => {
    if (total !== null) {
      const calc = Object.values(total).reduce(
        (previousValue, currentValue) =>
          parseFloat(previousValue) + parseFloat(currentValue)
      );
      setSummary(calc);
    }
  }, [total]);

  useEffect(() => {
    if (outfit === 'shirt') {
      setOutfitImage(whiteShirt);
      switch (outfitColor) {
        case 'white':
          setOutfitImage(whiteShirt);
          setTotal({ ...total, base: '16.95' });
          break;
        case 'black':
          setOutfitImage(blackShirt);
          setTotal({ ...total, base: '16.95' });
          break;
        case 'green':
          setOutfitImage(greenShirt);
          setTotal({ ...total, base: '18.95' });
          break;
        case 'red':
          setOutfitImage(redShirt);
          setTotal({ ...total, base: '18.95' });
          break;
      }
    }
    if (outfit === 'sweater') {
      setOutfitImage(whiteSweater);
      switch (outfitColor) {
        case 'white':
          setOutfitImage(whiteSweater);
          setTotal({ ...total, base: '28.95' });
          break;
        case 'black':
          setOutfitImage(blackSweater);
          setTotal({ ...total, base: '28.95' });
          break;
        case 'pink':
          setOutfitImage(pinkSweater);
          setTotal({ ...total, base: '32.95' });
          break;
        case 'yellow':
          setOutfitImage(yellowSweater);
          setTotal({ ...total, base: '32.95' });
          break;
      }
    }
  }, [outfit, outfitColor]);

  return (
    <div className="App">
      <h1>T-Shirt Design</h1>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <h2>
            Cart:
            <span style={{ marginLeft: '50px', color: 'green' }}>{`$${
              summary !== null ? summary : 0
            }`}</span>
          </h2>
        </div>
        <div className={'main'}>
          <div
            className={'sub-container'}
            style={{
              backgroundImage: `url(${outfitImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <p
              style={{
                minWidth: '100px',
                fontWeight: 'bold',
                textShadow:
                  textColor !== 'white'
                    ? '0px 0px 3px #fff'
                    : '0px 0px 3px #000',
                color: `${textColor}`,
              }}
            >
              {outfitText}
            </p>
            <img
              src={logoImage}
              alt=""
              style={{
                width: '50px',
                height: '50px',
                display: logoImage !== null ? 'block' : 'none',
              }}
            />
          </div>
          <div className={'sub-container'}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <select
                name="outfit"
                id="outfit-id"
                onChange={(event) => outfitHandler(event)}
              >
                {outfitType.map((i) => (
                  <option value={i} key={i}>
                    {i}
                  </option>
                ))}
              </select>
              {outfit !== 'sweater' ? (
                <select
                  name="shirt-material"
                  id="shirt-material-id"
                  onChange={(event) => outfitMaterialHandler(event)}
                >
                  {shirtMaterialType.map((i) => (
                    <option value={i} key={i}>
                      {i}
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  name="sweater-material"
                  id="sweater-material-id"
                  onChange={(event) => outfitMaterialHandler(event)}
                >
                  <option value="default">default</option>
                </select>
              )}
              {outfit !== 'sweater' ? (
                <select
                  name="shirt-color"
                  id="shirt-color-id"
                  onChange={(event) => outfitColorHandler(event)}
                >
                  {shirtColors.map((i) => (
                    <option value={i} key={i}>
                      {i}
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  name="sweater-color"
                  id="sweater-color-id"
                  onChange={(event) => outfitColorHandler(event)}
                >
                  {sweaterColors.map((i) => (
                    <option value={i} key={i}>
                      {i}
                    </option>
                  ))}
                </select>
              )}
              <div style={{ display: 'flex' }}>
                <input
                  type="text"
                  maxLength={'10'}
                  onChange={(event) => inputHandler(event)}
                  placeholder={'optional text'}
                />
                <label
                  style={{
                    background: '#000',
                    textAlign: 'center',
                    border: '1px solid #ccc',
                  }}
                >
                  <input
                    type="radio"
                    name={'item-color'}
                    checked={textColor === 'black' ? 'checked' : ''}
                    value={'black'}
                    onChange={(event) => radioButtonsHandler(event)}
                  />
                </label>
                <label
                  style={{
                    background: '#fff',
                    textAlign: 'center',
                    border: '1px solid #ccc',
                  }}
                >
                  <input
                    type="radio"
                    name={'item-color'}
                    value={'white'}
                    onChange={(event) => radioButtonsHandler(event)}
                  />
                </label>
                <label
                  style={{
                    background: 'green',
                    textAlign: 'center',
                    border: '1px solid #ccc',
                  }}
                >
                  <input
                    type="radio"
                    name={'item-color'}
                    value={'green'}
                    onChange={(event) => radioButtonsHandler(event)}
                  />
                </label>
                {/* 
                <input type="radio">White</input>
                <input type="radio">Colored</input> */}
              </div>
              <input
                type="file"
                onChange={(event) => fileUploadHandler(event)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
