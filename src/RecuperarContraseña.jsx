import react, {useState} from react

const RecuperarContra =() =>{
    const [email,setEmail] = useState('');
    const [mensaje,setMensaje] = useState('');

    const recuperador = (e)=>{
    e.defecto();
    //to do logica recuperar contraseña
      setMensaje('se envio el enlace para recuperar la contraseña. ${email}');
    };
    return(
    <div classname="Recuperar Contraseña">
     <h2>Recuperar Contraseña</h2>
      <form onSubmit={defecto}>
       <label htmlFor="email">Correo Electronico</label>
        <input 
        type="email"
        id="email"
        value={email}
        onChange={(e)=> setEmail(e.target.value)
        }required
        >
            <button type ="submit">Enviar</button>
        </input>
      </form>
    </div>
    
    );

};
export default RecuperarContra