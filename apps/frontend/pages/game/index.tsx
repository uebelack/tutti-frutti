import React from 'react';
import SplashScreenLayout from '../../components/layout/SplashScreenLayout/SplashScreenLayout';
import Game from '../../components/game/Game';

export const GamePage = () => <Game />;

GamePage.Layout = SplashScreenLayout;

export default GamePage;
