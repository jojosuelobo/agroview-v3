// eslint-disable-next-line no-unused-vars
import styles from './Login.module.scss';
import Logo from '../../../public/logoLight.svg';
import { FaRegEyeSlash } from 'react-icons/fa';
import { FaRegEye } from 'react-icons/fa';

import { useState } from 'react';
export default function Login() {
  const [formData, setFormData] = useState({
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
          <h2 className={styles.title}>Login</h2>
          <div className={styles.inputControl}>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              value={formData.email}
              onChange={handleChange}
              name='email'
            />
          </div>
          <div className={styles.inputControl}>
            <label htmlFor='password'>Password</label>
            <input
              type={showPass ? 'password' : 'text'}
              value={formData.password}
              onChange={handleChange}
              name='password'
            />
            <div onClick={handleShowPass} className={styles.showPassBtn}>
              {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>
            <a className={styles.forgetPassLink} href='#'>
              Esqueci a senha
            </a>
          </div>
          <button type='submit' className={styles.submitBtn}>
            Login
          </button>
          <a href='#' className={styles.signupLink}>
            {' '}
            Nao possui conta? <span>Criar uma conta</span>
          </a>
        </form>
      </div>
    </section>
  );
}
