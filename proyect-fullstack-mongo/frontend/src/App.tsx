import { useEffect, useState } from "react";
import { createUser, getUsers, type User } from "./services/api";

interface Message {
  name?:string;
  type: 'success' | 'danger'
}

//1
interface Errors {
  name?:string,
  email?:string,

}

function App () {
  const [users,setUsers] = useState<User[]>([]);
  const [name,setName] = useState<string>('');
  const [email,setEmail] = useState<string>('');
  const [message, setMessage] = useState<Message | null>(null)
  //2
  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)
  const [isValid, setIsValid] = useState(false);

  const loadUsers = async () => {
    setLoading(true)
    const data = await getUsers();
    setTimeout(() => setLoading(false),3000)
    setUsers(data);
  }

//3
  const validateForm = (name:string, email:string):boolean => {
    const newErrors: Errors = {};
    if(!name.trim()){
      newErrors.name = 'El nombre es obligatorio'
    }
    if(!(name.length > 3)){
      newErrors.name = 'El nombre debe tener al menos 3 caracteres'
    }
    if(!email.trim()){
      newErrors.email = 'El email es obligatorio'
    }else if(!email.includes('@')){
      newErrors.email = 'El email no tiene el formato correcto'
    }
    setErrors(newErrors)
    const formOk = Object.keys(newErrors).length === 0;
    setIsValid(formOk);
    return formOk;
  }


  const handleSubmit = async(e:React.FormEvent) => {
    e.preventDefault()
    //4
    if (!validateForm(name, email)) return
    
    if (email.toLowerCase().endsWith('example.com')) {
      setErrors(prev => ({ ...prev, email: 'Los correos de example.com no están permitidos.' }));
      setIsValid(false);
      return;
    }
    try{
    await createUser({name, email });
    setName('');
    setEmail('');
    loadUsers();
    setMessage({name:'Usuario creado correctamente', type:'success'});
    } catch (error) {
       setMessage({name:'No se ha podido guardar el usuario', type:'danger'});
    }
    setTimeout(()=> setMessage(null), 3000)
  }

useEffect(() => {
  loadUsers();
},[]);

//5
return (
  <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
        <h2 className="card-title mb-4 text-center">Usuarios</h2>
        {message && <div className={`alert alert-${message.type} mt-3`}>{message.name}</div>}
        
          <form onSubmit={handleSubmit} className="mb-4" noValidate>
            <div className="mb-3">
            <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : '' }` }
            value={name} placeholder="Nombre Usuario" onChange={e => { setName(e.target.value); validateForm(e.target.value,email); }} />
            {errors.name && (
              <div className="invalid-feedback  mb-4">{errors.name}</div>
            )}
            </div>
            <div className="mb-3">
            <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : '' }` }
            value={email} placeholder="Email Usuario" onChange={e => { setEmail(e.target.value); validateForm(name,e.target.value); }}
            />
            {errors.email && (
              <div className="invalid-feedback  mb-4">{errors.email}</div>
            )}
            </div>
            <button className={`btn btn-${!isValid ? 'danger' : 'success'}`} disabled={!isValid}>Crear Usuario</button>
          </form>
          {loading &&(
            <div className="spinner-border" role="status">
              </div>
          )} 
          {!loading && (
            <ul className="list-group">
              {users.map(u => (
                <li key={u._id} className="list-group-item d-flex justify-content-between align-items-center">
                  {u.name} - {u.email}
                </li>
              ))}
            </ul>
          )}
  </div>
  
</div>
</div>


);
}

export default App;