import React from 'react';

function Footer(){
  let date = new Date();
  // let style = {}
  return(
      <div style={{position:'relative', bottom:0, width: '100%', textAlign: 'center'}}>
        <p className='footer'>AGISO Все права защищены {date.getFullYear()}</p>
      </div>
  );
}

export default Footer;
