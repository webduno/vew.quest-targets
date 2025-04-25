'use client';
import { ResultBadge } from '@/dom/bew/ResultBadge';
import CanvasDraw from 'react-canvas-draw';
import { useRef, useEffect } from 'react';
import JSConfetti from 'js-confetti';
import { useSearchParams } from 'next/navigation';

interface TelegramWebApp {
  ready: () => void;
  sendData: (data: string) => void;
  initDataUnsafe?: {
    user?: {
      id: string;
    };
  };
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export const ToolResultsCard = ({
  target, results, sentObject, overallAccuracy, showImageModal, setShowImageModal, showSketchModal, setShowSketchModal, sketchData, notes, handleTryAgain, selectedTargetInfo
}: {
  target: {
    code: string;
    values: {
      type: string;
      natural: number;
      temp: number;
      light: number;
      color: number;
      solid: number;
      confidence: number;
    };
  };
  results: {
    type: boolean;
    natural: number;
    temp: number;
    light: number;
    color: number;
    solid: number;
    confidence: number;
  };
  sentObject: {
    type: string;
    natural: number;
    temp: number;
    light: number;
    color: number;
    solid: number;
    confidence: number;
  } | null;
  overallAccuracy: number;
  showImageModal: boolean;
  setShowImageModal: (value: boolean) => void;
  showSketchModal: boolean;
  setShowSketchModal: (value: boolean) => void;
  sketchData: any;
  notes: any;
  handleTryAgain: () => void;
  selectedTargetInfo: {
    id: string;
    description: string;
  } | null;
}) => {
  const canvasRef = useRef<CanvasDraw>(null);
  const confettiRef = useRef<JSConfetti | null>(null);
  
  useEffect(() => {
    confettiRef.current = new JSConfetti();
    setTimeout(() => {
      confettiRef?.current?.addConfetti({
        confettiColors: ['#FDC908', '#7DDB80', '#807DDB', '#6DcB70'],
        confettiNumber: 50,
      });
    }, 200);
  }, []);

  const handleDownloadDrawing = () => 
    {
    // if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    //   alert('Downloading is not available in Telegram Mini App');
    //   return;
    // }

    // const searchParams = useSearchParams();
    // const isTelegramMiniApp = () => {
    //   if (typeof window === 'undefined') return false;
    //   const tgWebAppStartParam = searchParams.get('tgWebAppStartParam');
    //   const tgWebAppPlatform = searchParams.get('tgWebAppPlatform');
    //   return tgWebAppStartParam !== null || tgWebAppPlatform !== null;
    // };

    // if (isTelegramMiniApp()) {
    //   // Telegram Mini App specific handling
    //   if (canvasRef.current) {
    //     const drawingCanvas = (canvasRef.current as any).canvas.drawing;
    //     const targetImage = new Image();
    //     targetImage.crossOrigin = 'anonymous';
    //     targetImage.src = `/data/image/${selectedTargetInfo?.id.padStart(12, '0')}.jpg`;
        
    //     targetImage.onload = () => {
    //       const combinedCanvas = document.createElement('canvas');
    //       const ctx = combinedCanvas.getContext('2d');
          
    //       combinedCanvas.width = 600;
    //       combinedCanvas.height = 350;
          
    //       if (ctx) {
    //         ctx.fillStyle = 'white';
    //         ctx.fillRect(0, 0, combinedCanvas.width, combinedCanvas.height);
            
    //         ctx.fillStyle = '#4B4B4B';
    //         ctx.font = '20px Consolas';
    //         ctx.textAlign = 'center';
    //         const playerId = localStorage.getItem('VB_PLAYER_ID');
    //         ctx.fillText(selectedTargetInfo?.id ? "Vew.quest | @"+playerId +' | #'+selectedTargetInfo?.id : 'n/a', combinedCanvas.width/2, 30);
            
    //         ctx.drawImage(drawingCanvas, 10, 50, 300, 300);
    //         ctx.drawImage(targetImage, 310, 50, 300, 300);
            
    //         ctx.fillStyle = '#4B4B4B';
    //         ctx.font = '14px Arial';
    //         ctx.textAlign = 'center';
    //         ctx.fillText('Your Drawing', 160, 360);
    //         ctx.fillText('Target Image', 460, 360);
            
    //         // In Telegram Mini App, we can use the WebApp.ready() method to share the image
    //         try {
    //           if (window.Telegram?.WebApp) {
    //             window.Telegram.WebApp.ready();
    //             window.Telegram.WebApp.sendData(combinedCanvas.toDataURL('image/png'));
    //           } else {
    //             // Fallback to regular download
    //             const link = document.createElement('a');
    //             link.download = 'drawing_comparison.png';
    //             link.href = combinedCanvas.toDataURL('image/png');
    //             link.click();
    //           }
    //         } catch (e) {
    //           console.error('Error sharing in Telegram:', e);
    //           // Fallback to regular download
    //           const link = document.createElement('a');
    //           link.download = 'drawing_comparison.png';
    //           link.href = combinedCanvas.toDataURL('image/png');
    //           link.click();
    //         }
    //       }
    //     };
    //   }
    //   return;
    // }

    // Regular web browser handling
    if (canvasRef.current) {
      const drawingCanvas = (canvasRef.current as any).canvas.drawing;
      const targetImage = new Image();
      const logoImage = new Image();
      targetImage.crossOrigin = 'anonymous';
      logoImage.crossOrigin = 'anonymous';
      targetImage.src = `/data/image/${selectedTargetInfo?.id.padStart(12, '0')}.jpg`;
      logoImage.src = '/bew/pnglogo.png';
      
      Promise.all([
        new Promise(resolve => targetImage.onload = resolve),
        new Promise(resolve => logoImage.onload = resolve)
      ]).then(() => {
        const combinedCanvas = document.createElement('canvas');
        const ctx = combinedCanvas.getContext('2d');
        
        combinedCanvas.width = 600;
        combinedCanvas.height = 350;
        
        if (ctx) {
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, combinedCanvas.width, combinedCanvas.height);
          
          const logoHeight = 40;
          const logoWidth = (logoImage.width * logoHeight) / logoImage.height;
          ctx.filter = 'saturate(0) opacity(0.5)';
          // ctx.drawImage(logoImage, 20, 2, logoWidth, logoHeight);
          ctx.filter = 'saturate(1) ';
          // ctx.drawImage(logoImage, 540, 2, logoWidth, logoHeight);

          ctx.fillStyle = '#4B4B4B';
          ctx.font = '20px Consolas';
          ctx.textAlign = 'center';
          const playerId = localStorage.getItem('VB_PLAYER_ID');
          ctx.fillText(selectedTargetInfo?.id ? "Vew.quest | @"+playerId +' | #'+selectedTargetInfo?.id : 'n/a', combinedCanvas.width/2, 30);
          
          ctx.drawImage(drawingCanvas, 10, 50, 300, 300);
          ctx.drawImage(targetImage, 310, 50, 300, 300);
          
          ctx.fillStyle = '#4B4B4B';
          ctx.font = '14px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('Your Drawing', 160, 360);
          ctx.fillText('Target Image', 460, 360);
          
          const link = document.createElement('a');
          link.download = 'drawing_comparison.png';
          link.href = combinedCanvas.toDataURL('image/png');
          link.click();
        }
      }).catch(err => {
        alert('Error downloading drawing (See console for details)');
        console.error('Error downloading drawing:', err);
      });
    }
  };

  const handleShareToReddit = () => {
    
    const title = `My drawing vs target image on Vew.quest #${selectedTargetInfo?.id}`;
    const url = `https://www.reddit.com/r/remoteviewing/submit?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(title)}&type=image`;
    window.open(url, '_blank');
  };

  const handleShareToTwitter = () => {
    
    const text = `My drawing vs image on target #${selectedTargetInfo?.id}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="tx-white tx-center mt-100 pb-4">
      <div className="tx-lg tx-altfont-2 tx-bold-5"
        style={{
          color: "#FDC908",
        }}
      >Results for  #{target.code}!
      </div>
      <div className='tx-white bord-r-100 mt-1 py-1 pos-rel'
        style={{
          background: "#E5E5E5",
          boxShadow: "0 2px 0 #D68800",
          overflow: "hidden"
        }}
      >
        <div className='pos-abs top-0 left-0 h-100'
          style={{
            width: `${overallAccuracy}%`,
            background: "#FDC908",
            transition: "width 0.5s ease-out"
          }}
        ></div>
        <div
          style={{
            color: "#D68800",
          }}
          className='tx-bold pos-rel '>{Number(overallAccuracy).toFixed(3)}%</div>
      </div>

      <div className='w-300px py-3 my-3 px-4 bord-r-15' style={{
        border: "1px solid #E5E5E5",
        background: "#f7f7f7",
      }}>
        {!showImageModal && !showSketchModal && (
          <div className="flex-col gap-2">
            <div className="flex-wrap gap-2 w-100  flex-align-stretch">
              <div className="flex-col bord-r-15 "
                style={{
                  padding: "3px 3px 6px 3px",
                  background: "#7DDB80",
                }}
              >
                <div className="flex-col flex-1 tx-start tx-white py-1 flex-justify-between px-3">
                  <div className='flex-col flex-justify-start  tx-center'>
                    <div className='pb-1'>Sent Type:</div>
                    <div className='flex-row flex-align-center  gap-1 tx-bold'>
                      <div>{sentObject?.type.toUpperCase()}</div>
                      <div className='tx-xs'>{results.type ? "(HIT)" : "(MISS)"}</div>
                    </div>
                  </div>
                </div>
                <div className="tx-white py-1 bg-white w-100 bord-r-15 flex-row gap-1"
                  style={{
                    color: "#7DDB80"
                  }}
                >
                  <div>Target:</div>
                  <div>{target.values.type.toUpperCase()}</div>
                </div>
              </div>

              <ResultBadge
                label="Natural"
                keyName="natural"
                sentObject={sentObject} target={target} results={results} />

              <ResultBadge
                label="Temperature"
                keyName="temp"
                sentObject={sentObject} target={target} results={results} />

              <ResultBadge
                label="Light"
                keyName="light"
                sentObject={sentObject} target={target} results={results} />

              <ResultBadge
                label="Color"
                keyName="color"
                sentObject={sentObject} target={target} results={results} />

              <ResultBadge
                label="Solid"
                keyName="solid"
                sentObject={sentObject} target={target} results={results} />
            </div>
          </div>
        )}

        {showImageModal && (
          <>
            <div className='bord-r-15 flex-col'
              style={{
                minHeight: "300px",
              }}
            >
              <img className='block pos-rel'
                src={`/data/image/${selectedTargetInfo?.id.padStart(12, '0')}.jpg`}
                alt={selectedTargetInfo?.description}
                style={{
                  overflow: 'hidden',
                  borderRadius: "3px",
                  width: '100%',
                  maxWidth: '300px',
                  maxHeight: '300px',
                  objectFit: 'contain'
                }} />
              <div className="tx-center tx-altfont-2 mt-2"
                style={{
                  color: "#4B4B4B",
                }}>
                {selectedTargetInfo?.description}
              </div>
            </div>
          </>
        )}

        {showSketchModal && !showImageModal && (
          <>
            <div className='bord-r-15 flex-col'
              style={{
                minHeight: "300px",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {sketchData ? (
                <CanvasDraw
                  ref={canvasRef}
                  disabled
                  hideGrid
                  canvasWidth={300}
                  canvasHeight={200}
                  saveData={sketchData}
                  style={{
                    borderRadius: "15px",
                  }} />
              ) : (
                <div className="tx-center tx-altfont-2 tx-black opaci-50">Drawing not found</div>
              )}
            </div>
            <div className="flex-row gap-2 justify-center mt-2">
              
            <div className='flex-col gap-1'>
              <button
                className="tx-sm bg-trans noborder pa-0 pointer tx-altfont-2 px-1"
                style={{
                  color: "#FF4500",
                }}
                onClick={handleShareToReddit}
              >
                <div>🔗 Reddit</div>
              </button>
              <button
                className="tx-sm bg-trans noborder pa-0 pointer tx-altfont-2 px-1"
                style={{
                  color: "#111111",
                }}
                onClick={handleShareToTwitter}
              >
                <div>🔗 Twitter</div>
              </button>
              </div>
              <button
                className="tx-sm bg-trans bord-r-10 pb-1 noborder pa-0 pointer tx-altfont-2 px-1"
                style={{
                  color: "#22a2f2",
                  border: "1px solid #22a2f2",
                }}
                onClick={handleDownloadDrawing}
              >
                <div>📂 Download your <br /> Drawing / Target Image </div>
              </button>
            </div>
          </>
        )}
      </div>

      <div className="flex-col flex-justify-center gap-2">
        <div className="flex-row gap-2 ">
          {(!!showImageModal || !!showSketchModal) && (
            <button
              className="mt- 2 tx-sm bg-trans noborder pa-0 pointer tx-altfont-2 underline px-1"
              style={{
                color: "#999999",
              }}
              onClick={() => {
                setShowImageModal(false);
                setShowSketchModal(false);
              }}
            >
              <div>Show Results</div>
            </button>
          )}
          {!showImageModal && (
            <button
              className="mt- 2 tx-sm bg-trans noborder pa-0 pointer tx-altfont-2 underline px-1"
              style={{
                color: "#999999",
              }}
              onClick={() => {
                setShowImageModal(!showImageModal);
                if (!showImageModal) {
                  setShowSketchModal(false);
                }
              }}
            >
              <div>{showImageModal ? "Hide Image" : "Show Image"}</div>
            </button>
          )}

          <button
            className="mt- 2 tx-sm bg-trans noborder pa-0 pointer tx-altfont-2 underline px-1"
            style={{
              color: "#999999",
            }}
            onClick={() => {
              setShowSketchModal(!showSketchModal);
              if (!showSketchModal) {
                setShowImageModal(false);
              }
            }}
          >
            <div>{showSketchModal ? "Hide Drawing" : "Show Drawing"}</div>
          </button>
          <button onClick={() => {
            alert("Notes:\n\n" + (notes || "No notes found!"));
          }}
            className='tx-sm pa-1 bord-r-15 opaci-chov--50'
            style={{
              color: "#999999",
            }}
          >
            Notes
          </button>
        </div>
        <div className='flex-row gap-2'>
          <button
            style={{
              background: "#807DDB",
              boxShadow: "0px 4px 0 0px #6B69CF",
            }}
            className="tx-lg py-1 px-4 bord-r-10 noborder bg-trans tx-white pointer tx-altfont-2"
            onClick={() => {
              window.location.href = "/dashboard";
            }}
          >
            <div>Dashboard</div>
          </button>
          <button
            style={{
              background: "#6DcB70",
              boxShadow: "0px 4px 0 0px #24aE27",
            }}
            className="tx-lg py-1 px-4 bord-r-10 noborder bg-trans tx-white pointer tx-altfont-2"
            onClick={handleTryAgain}
          >
            <div>Next Target</div>
          </button>
        </div>
      </div>
    </div>
  );
};
