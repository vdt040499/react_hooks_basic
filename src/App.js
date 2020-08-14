import React, { useState, useCallback, useMemo } from 'react';

import Hero from './components/Hero/index';

function App() {

  const [count, setCount] = useState(0)

  const handleHeroClick = useCallback(() => {},[]);
  const data = useMemo(() => [],[]);

  return (
    <div>
      <p>{count}</p>

      <button onClick={() => setCount(count + 1)}>Increase</button>

      <Hero data={data} name="Võ Tân" onClick={handleHeroClick}></Hero>
    </div>
  );
}

export default App;