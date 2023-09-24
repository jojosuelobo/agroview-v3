
// eslint-disable-next-line no-unused-vars
import styles from './Register.module.scss';
import Logo from '../../../public/logoLight.svg';
import { FaRegEyeSlash } from 'react-icons/fa';
import { FaRegEye } from 'react-icons/fa';

import { useState } from 'react';
export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPass, setShowPass] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPass = () => setShowPass(!showPass);

  return (
    <section className={styles.login}>
      <div className={styles.cover}>
        <img src={Logo} alt='Logo' className={styles.logo} />
      </div>
      <div className={styles.formCon}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Criar uma conta</h2>
          <div className={styles.inputControl}>
            <label htmlFor='name'>Name completo*</label>
            <input
            required
              type='text'
              value={formData.name}
              onChange={handleChange}
              name='name'
            />
          </div>
          <div className={styles.inputControl}>
            <label htmlFor='email'>Email*</label>
            <input
            required
              type='email'
              value={formData.email}
              onChange={handleChange}
              name='email'
            />
          </div>
          <div className={styles.inputControl}>
            <label htmlFor='password'>Senha*</label>
            <input
            required
              type={!showPass ? 'password' : 'text'}
              value={formData.password}
              onChange={handleChange}
              name='password'
            />
            <div onClick={handleShowPass} className={styles.showPassBtn}>
              {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>
          </div>
          <button type='submit' className={styles.submitBtn}>
            Create Account
          </button>
          <a href='#' className={styles.signupLink}>
            {' '}
            Ja possui conta?<span>Entre agora</span>
          </a>
        </form>
      </div>
    </section>
  );
}
