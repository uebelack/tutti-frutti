import React from 'react';
import Game from '../../components/game/Game';

function Index() {
  return (
    <div className="w-3/4 md:w-1/2 max-w-[350px] mx-auto flex flex-col gap-16">
        <Game />
    </div>
  );
}

export default Index;
