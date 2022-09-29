import { useState } from 'react';
import Draggable from 'react-draggable';
import './App.css';
import './nerb.scss';

const createTestDeck = (count: number) => {
  const deck = []
  for (let i = 0; i < count; i++) {
    deck.push({
      id: i + '',
      name: `Card ${i}`
    })
  }
  return deck
}

function App() {

  const [mainDeck, setMainDeck] = useState(createTestDeck(10))

  // const [currentOrder, setCurrentOrder] = useState(createTestDeck(10));

  const [currentCard, setCurrentCard] = useState({ id: '', name: '' });

  const [dropZone, setDropZone] = useState('');

  const onStart = (e: any, data: any) => {
    // console.log('on start', e, data)
  };

  const onStop = (e: any, data: any) => {
    // console.log('on stop', e, data)
  };

  const onDrag = (e: any, data: any) => {
    // console.log('on drag', e, data)
  }


  return (
    <div className="nerb">
      <div className="stuff-bounds">

        <div className={`main-zone ${dropZone === 'main' && currentCard.id ? 'active' : ''}`}>
          Main Zone {dropZone === 'main' ? 'active' : ''}
        </div>


        <div className={`other-zone ${dropZone === 'other' && currentCard.id ? 'active' : ''}`}>
          Other Zone
        </div>


        {mainDeck.map((card, idx) => {

          const xPos: number = (idx % 6) * 110
          const yPos: number = Math.floor(idx / 6) * 110

          return (
            <Draggable
              key={`card-${card.id}`}
              position={currentCard && currentCard.id === card.id ? undefined : {
                x: xPos,
                y: yPos
              }}
              bounds={'.stuff-bounds'}
              // bounds={'parent'}
              // grid={[55, 55]}
              // grid={[110, 110]}
              onStart={(e: any, data: any) => {
                setCurrentCard(card)
              }}
              onDrag={(e: any, data: any) => {

                let dropArea = ''

                draggableAreas.forEach((area) => {
                  const { x, y, w, h } = area
                  if(data.x < x + w && data.x > x && data.y < y + h && data.y > y) {
                    dropArea = area.name
                  }
                })

                if(dropArea !== dropZone) {
                  setDropZone(dropArea)
                }

                const currentPos = Math.floor(data.x / 110) + (Math.floor(data.y / 110) * 6)
                if (currentPos !== idx && currentPos >= 0 && currentPos < mainDeck.length) {
                  // console.log('moving', currentPos, idx)
                  // console.log(e, data)
                  const newOrder = [...mainDeck].filter(x => x.id !== card.id)
                  // console.log('new order', newOrder)
                  newOrder.splice(currentPos, 0, card)
                  // console.log('splice', newOrder)
                  setMainDeck(newOrder)
                }
              }}
              onStop={(e: any, data: any) => {
                if (currentCard && currentCard.id === card.id) {
                  setCurrentCard({ id: '', name: '' })
                }
              }}>
              <div className={`move-box ${currentCard && currentCard.id === card.id ? 'selected' : ''}`}>
                Card: {card.id}  <br />
                {xPos}, {yPos}
              </div>
            </Draggable>
          )
        })
        }



      </div>
    </div>
  );
}

const draggableAreas = [
  {
    x: 0, y: 0, w: 800, h: 300, name: 'main'
  },
  {
    x: 0, y: 300, w: 800, h: 300, name: 'other'
  }
]

export default App;
