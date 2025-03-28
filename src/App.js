import React, { useState, useEffect, useRef } from 'react';
import Page from './Page';
import cureseeker from './cureseeker.json';
import "./App.css";

function App() {
	const audioRef = useRef(null);
	const [selectedId, setSelectedId] = useState(0); // Default ID
	const page = cureseeker.find((u) => u.id === selectedId); // Find user by ID
	const [musicpath, setMusicPath] = useState("Beyond_the_Flowers-_Main_Theme_sample.mp3"); // Store last valid music path
	console.log('Image path:', `${process.env.PUBLIC_URL}/assets/images/${page.image}`);


	useEffect(() => {
        const enableAudio = () => {
            if (audioRef.current) {
                audioRef.current.play().catch(error => console.error("Playback failed:", error));
                document.removeEventListener("click", enableAudio);
            }
        };

        document.addEventListener("click", enableAudio);
        return () => document.removeEventListener("click", enableAudio);
    }, []);

	useEffect(() => {
        if (page.music) {
            setMusicPath(page.music); // Update music path only if page.music exists
        }
    }, [page.music]); // Runs only when page.music changes

	useEffect(() => { // Change music source dynamically when musicPath updates
        if (audioRef.current) {
			audioRef.current.volume = 0.25;
            audioRef.current.src = `${process.env.PUBLIC_URL}/assets/audio/music/${musicpath}`;
            audioRef.current.load();  // Reload the new music file
            audioRef.current.play().catch(error => console.error("Playback failed:", error));
        }
    }, [musicpath]); // Runs every time musicPath changes

	const handleButtonJump = (jumpIndex) => {
        if (jumpIndex !== undefined) {
            setSelectedId(jumpIndex);
        }
    };

	return (
		<div className="full-screen" onClick={() => {
			if (page.jump) {
				setSelectedId(page.jump);
			} else if (!page.stopadvance) {
				setSelectedId(selectedId + 1);
			}
			
		}}>
			<Page page={page} handleButtonJump={handleButtonJump}/>
			<audio ref={audioRef} loop>
                <source src={`${process.env.PUBLIC_URL}/assets/audio/music/${musicpath}`} type="audio/mp3" />
            </audio>
		</div>
	);
}

export default App;
