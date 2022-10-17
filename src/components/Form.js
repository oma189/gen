


import React from 'react';
import {FaAngleLeft, FaAngleRight} from 'react-icons/fa';
import html2canvas from 'html2canvas';
import c from '../images/c.jpg'




export default function Form(){


  const [all_memes, set_all_memes] = React.useState([])
  const [open_status, set_open_status] = React.useState(false)

  React.useEffect(() => {
    return fetch('https://api.imgflip.com/get_memes')
    .then(res => res.json())
    .then(data => set_all_memes(data.data.memes))
  }, [])





  const [meme, set_meme] = React.useState({
    top_text: "",
    bottom_text: "",
    random_img: "https:\/\/i.imgflip.com\/1g8my4.jpg"
  })





  const x = {
    color: 'white',
    fontSize: '20px',
    textShadow: '0 0 15px grey'
  }

  const [styles, set_styles] = React.useState(x)

  function change_meme_img(){
    let meme_img = all_memes[Math.floor(Math.random() * all_memes.length)]['url']
    set_meme((prev) => (
      {
        ...prev,
        random_img: `${meme_img}`
      })
    )
  }




  function handle_meme_text(event){
    const {name, value} = event.target
    set_meme((prev) => (
       {
          ...prev,
          [name] : value
        }
    ))
  }




  function handle_text_color(event){
    const value = event.target.value;
    set_styles(prev => {
      return {
        ...prev,
        color : value
      }
    })
  }



  function handle_shadow_color(event){
    const value = event.target.value;
    set_styles(prev => {
      return {
        ...prev,
        textShadow : `0 0 15px ${value}`
      }
    })
  }


  function handle_open_status(){
    set_open_status(prev => !prev)
  }



  function handle_font(event){
    const value = event.target.value;
    set_styles(prev => {
      return {
        ...prev,
        fontSize: `${value}px`
      }
    })
  }


  async function handle_img_download () {
    const element = document.getElementsByClassName('meme')[0],
    canvas = await html2canvas(element, {
      allowTaint: true,
      useCORS: true
    }),
    data = canvas.toDataURL('image/jpg'),
    link = document.createElement('a');
 
    link.href = data;
    link.download = 'downloaded-image.jpg';
 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };





  
  return (
    <div className='form'>
      <input
        type="text"
        placeholder='Upper text here'
        name='top_text'
        onChange={handle_meme_text}
        value={meme.top_text} />


      <input
        type="text"
        placeholder="Bottom text here" 
        name='bottom_text'
        onChange={handle_meme_text}
        value={meme.bottom_text} />


      <aside id='buttons'>
        <button
          onClick={change_meme_img}
          className='img_changer_button'> Get a new meme image </button>
        
        <button onClick={handle_img_download} className='download_btn'> Download </button>
      </aside>


      
      <aside id='edit'>
        {
        open_status ? 
        <FaAngleLeft className='opener' onClick={handle_open_status}/> :
        <FaAngleRight className='opener' onClick={handle_open_status}/>
        }
        {open_status && <aside className='edit_contents'>
          <input type='color' onChange={handle_text_color} className='color_box'/>
          <input type='color' onChange={handle_shadow_color} className='color_box'/>
          <input type='range' onChange={handle_font} className='range_slider'/>
        </aside>}
      </aside>




      <article className='meme'>
        <h2 className='top_text' style={styles}> {meme.top_text} </h2>
        <h2 className='bottom_text' style={styles}> {meme.bottom_text} </h2> 
        <img src={meme.random_img} alt="click to add meme image" className='meme_img'/>
      </article>
    </div>
  )
}


