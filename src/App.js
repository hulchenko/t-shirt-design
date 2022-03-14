import './App.css';
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

  const outfitHandler = (event) => {
    setOutfit(event.target.value);
    if (event.target.value !== 'shirt') {
      setOutfitMaterial('default');
    } else {
      setOutfitMaterial('light-cotton');
    }
  };

  const outfitMaterialHandler = (event) => {
    setOutfitMaterial(event.target.value);
  };

  const outfitColorHandler = (event) => {
    setOutfitColor(event.target.value);
  };

  const inputHandler = (event) => {
    setOutfitText(event.target.value);
  };

  useEffect(() => {
    console.log(`OUTFIT: `, outfit);
    if (outfit === 'shirt') {
      setOutfitImage(whiteShirt);
      switch (outfitColor) {
        case 'white':
          setOutfitImage(whiteShirt);
          break;
        case 'black':
          setOutfitImage(blackShirt);
          break;
        case 'green':
          setOutfitImage(greenShirt);
          break;
        case 'red':
          setOutfitImage(redShirt);
          break;
      }
    }
    if (outfit === 'sweater') {
      setOutfitImage(whiteSweater);
      switch (outfitColor) {
        case 'white':
          setOutfitImage(whiteSweater);
          break;
        case 'black':
          setOutfitImage(blackSweater);
          break;
        case 'pink':
          setOutfitImage(pinkSweater);
          break;
        case 'yellow':
          setOutfitImage(yellowSweater);
          break;
      }
    }
  }, [outfit, outfitColor]);

  // console.log(`OUTFIT: `, outfit);
  // console.log(`MATERIAL: `, outfitMaterial);
  // console.log(`COLOR: `, outfitColor);

  return (
    <div className="App">
      <h1>T-Shirt Design</h1>
      <div className={'main'}>
        <div
          className={'sub-container'}
          style={{
            backgroundImage: `url(${outfitImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
        <p
          style={{
            position: 'absolute',
            marginTop: '250px',
            marginRight: '520px',
            fontWeight: 'bold',
            textShadow: '0px 0px 3px #fff',
          }}
        >
          {outfitText}
        </p>
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
            <input
              type="text"
              maxLength={'10'}
              onChange={(event) => inputHandler(event)}
              placeholder={'optional text'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
