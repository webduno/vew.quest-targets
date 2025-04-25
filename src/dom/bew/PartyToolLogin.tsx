'use client';
import { NavigationHeaderBar } from '@/dom/bew/NavigationHeaderBar';
import { random10CharString } from '../../../script/utils/platform/random10CharString';
import { GameState } from '@/app/(tool)/tool/page';
import { VersionTag } from './VersionTag';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation'
import { useProfileSnackbar } from '@/script/state/context/useProfileSnackbar';
import { BewPurpleBtn } from './BewBtns';

export interface PartyToolLoginProps {
  gameState: GameState;
  setGameState: (state: GameState) => void;
  typedUsername: string;
  setTypedUsername: (username: string) => void;
  isLoading: boolean;
  handleStart: (friendUsername?: string) => void;
  sanitizePlayerId: (id: string) => string;
}
export const PartyToolLogin: React.FC<PartyToolLoginProps> = ({
  gameState, setGameState, typedUsername, setTypedUsername, isLoading, handleStart, sanitizePlayerId
}) => {
  const version = process.env.VEW_PUBLIC_VERSION;
  const [friendUsername, setFriendUsername] = useState('');
  const { triggerSnackbar } = useProfileSnackbar();
  const router = useRouter();
  const params = useParams<{ id: string }>()
 
  useEffect(() => {
    // Get friend username from route parameters
    const friend = params.id;
    if (friend && typeof friend === 'string') {
      setFriendUsername(sanitizePlayerId(friend));
    }
  }, [router, sanitizePlayerId]);

  return (
    <>
      <NavigationHeaderBar linkList={<>
        <a href="/about" className='nodeco' style={{ color: "#AFAFAF" }}>
          <div>About <VersionTag /></div>
        </a>
      </>} />



      <div className='flex-wrap gap-8 px-4 '
        style={{
          height: "70vh",
        }}
      >
        <div className='flex-col '

        >
          <div className='Q_xs_sm py-4'></div>




          <img src="/bew/party.jpg"
            onClick={() => {
              setGameState('playing');
            }}
            style={{}}
            alt="tool_bg1" className='pointer bord-r-50 noverflow block w-200px' />

        </div>
        <div className=' tx-altfont-2 tx-bold gap-4  flex-col w-300px'
          style={{
            color: "#777777",
          }}
        >
          <div className='tx-center tx-lgx landing -title'>Create &amp; Start your <br /> Remote Viewing Party </div>

          {!typedUsername && (<>
          <a href="/tool" className=''>
          <BewPurpleBtn text="Login First"
            onClick={() => {
              // setTypedUsername('');
            }} />
          </a>
            </>)}
            {!!typedUsername && (<>
          <div>
            <div>
              <input readOnly disabled
                type="text"
                className='bord-r-10 tx-altfont-2 py-2 mb-2 px-3 tx-center'
                placeholder='Enter your name'
                style={{
                  border: "1px solid #E5E5E5",
                }}
                value={typedUsername}
                onChange={(e) => { setTypedUsername(sanitizePlayerId(e.target.value)); }}
                onKeyDown={(e) => {
                  if (!typedUsername) {
                    return;
                  }
                  if (e.key === "Enter") {
                    handleStart(friendUsername);
                  }
                }} />
            </div>
            <div>
              <input
                type="text"
                className='bord-r-10 tx-altfont-2 py-2 mb-2 px-3 tx-center'
                placeholder='Enter friend username'
                style={{
                  border: "1px solid #E5E5E5",
                }}
                value={friendUsername}
                onChange={(e) => { setFriendUsername(sanitizePlayerId(e.target.value)); }}
                onKeyDown={(e) => {
                  if (!typedUsername) {
                    return;
                  }
                  if (e.key === "Enter") {
                    handleStart(friendUsername);
                  }
                }} />
            </div>
            <div
              className='py-2 px-2 tx-center tx-white bord-r-10 tx-lgx opaci-chov--75'
              onClick={isLoading ? undefined : () => {
                if (!typedUsername) {
                  // const randomId = random10CharString();
                  // setTypedUsername(randomId);
                  // localStorage.setItem('VB_PLAYER_ID', randomId);
                  // window.location.reload();
                  triggerSnackbar("Please enter your name", "error")
                  // window.location.href = "/tool"
                  return;
                }
                handleStart(friendUsername);
              }}
              style={{
                backgroundColor: isLoading ? "#cccccc" : "#FE9C6D",
                boxShadow: isLoading ? "0px 4px 0 0px #999999" : "0px 4px 0 0px #FD7F42",
              }}
            >
              {isLoading ? "Loading..." : "PARTY"}
            </div>
          </div>
          </>)}

        </div>
      </div>
    </>
  );
};
