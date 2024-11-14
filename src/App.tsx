"use client";

import React, { useEffect, useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import './App.css';

const Model = () => {
  const obj = useLoader(OBJLoader, '/model.obj');

  useEffect(() => {
    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.computeVertexNormals();
        child.material = new THREE.MeshPhongMaterial({
          color: '#53bba5',
          shininess: 10,
          specular: 0xaaaaaa,
        });
      }
    });
  }, [obj]);

  return (
    <primitive
      object={obj}
      scale={[2, 2, 2]}
      position={[0, 0, 0]}
    />
  );
};

export default function Component() {
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops: number[] = Array(columns).fill(1);

    const matrixChars = "壱弌麤齋纛麺藝顯鸞鸚讃鬱顰蠢驫籠纏馨贄黛ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|]}".split('');

    // ランダムな文字列の配列を各列ごとに作成
    const maxStackSize = Math.ceil(canvas.height / fontSize);
    let columnsChars: string[][] = Array(columns).fill(0).map(() =>
      Array(maxStackSize).fill(0).map(() => matrixChars[Math.floor(Math.random() * matrixChars.length)])
    );

    // ドロップのリセットタイミングを事前に設定
    let resetPositions: number[] = Array(columns).fill(0).map(() => Math.floor(Math.random() * maxStackSize));

    let animationFrameId: number;

    const draw = () => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#53bba5';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        // 事前に計算した文字を使用
        const charIndex = drops[i] % maxStackSize;
        const text = columnsChars[i][charIndex];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // ドロップのリセット
        if (drops[i] > resetPositions[i]) {
          drops[i] = 0;
          // リセット位置と文字列を再計算（頻度を下げる）
          resetPositions[i] = maxStackSize + Math.floor(Math.random() * 100);
          columnsChars[i] = Array(maxStackSize).fill(0).map(() => matrixChars[Math.floor(Math.random() * matrixChars.length)]);
        }

        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      if (!canvas) return;
      resizeCanvas();
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);

      // 再度、事前計算を行う
      let maxStackSize = Math.ceil(canvas.height / fontSize);
      columnsChars = Array(columns).fill(0).map(() =>
        Array(maxStackSize).fill(0).map(() => matrixChars[Math.floor(Math.random() * matrixChars.length)])
      );
      resetPositions = Array(columns).fill(0).map(() => Math.floor(Math.random() * maxStackSize));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="app-container">
      <canvas ref={matrixCanvasRef} className="matrix-canvas" />

      {/* トップバー */}
      <div className="top-bar">
        JDjprgWYuidVGfExWzMp7Z81K3T6Qsg5aJCnG6srRLGW
      </div>

      <header className="app-header">
        <nav>
          <ul className="nav-list">
            <li className="nav-item">
              Chart
              <ul className="dropdown">
                <li><a href="https://dexscreener.com/solana/8eqej7m9banvn96ycizj2o8x3cr8ywmrfcxxjpsmwibc" target="_blank" rel="noopener noreferrer" className="nav-link">Dexscreener</a></li>
                <li>CoinGecko</li>
                <li>CoinMarketCap</li>
              </ul>
            </li>
            <li className="nav-item">
              Swap
              <ul className="dropdown">
                <li><a href="https://jup.ag/swap/SOL-JDjprgWYuidVGfExWzMp7Z81K3T6Qsg5aJCnG6srRLGW" target="_blank" rel="noopener noreferrer" className="nav-link">Jupiter</a></li>
                <li><a href="https://raydium.io/swap/?inputMint=sol&outputMint=JDjprgWYuidVGfExWzMp7Z81K3T6Qsg5aJCnG6srRLGW" target="_blank" rel="noopener noreferrer" className="nav-link">Raydium</a></li>
              </ul>
            </li>
            <li className="nav-item">
              Link
              <ul className="dropdown">
                <li><a href="https://x.com/fuckitwebol" target="_blank" rel="noopener noreferrer" className="nav-link">X</a></li>
                <li><a href="https://t.co/7UPvwZFZ4h" target="_blank" rel="noopener noreferrer" className="nav-link">Telegram</a></li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>

      <div className="bol-area">
        Fuck It We Bol
      </div>

      <div className="canvas-container">
        <Canvas className="three-canvas" camera={{ position: [300, 200, 200], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 0, 10]} intensity={1} />
          <Model />
          <OrbitControls />
        </Canvas>
      </div>

      <footer className="footer">
        <a href="https://bol-a-whac.vercel.app/" target="_blank" rel="noopener noreferrer" className="footer-link">
          © 2024 by Bolana. All rights reserved.
        </a>
      </footer>
    </div>
  );
}
