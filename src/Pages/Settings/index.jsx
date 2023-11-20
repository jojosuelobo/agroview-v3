/* eslint-disable no-unused-vars */
import styles from './Settings.module.sass'

import { useState } from 'react';

// Radix
import { Select, Text, Flex, Switch } from '@radix-ui/themes';

export default function Settings() {

  const [onOffEmail, setOnOffEmail] = useState(false)
  const buttonEmail = () => {
    if (onOffEmail == true) {
      setOnOffEmail(false)
      console.log('falso')
    } else {
      setOnOffEmail(true)
      console.log('true')
    }
  }

  const [onOffPhone, setOnOffPhone] = useState(false)
  const buttonPhone = () => {
    if (onOffPhone == true) {
      setOnOffPhone(false)
      console.log('falso')
    } else {
      setOnOffPhone(true)
      console.log('true')
    }
  }

  return (
    <div className={styles.section}>
      <h1>Configurações</h1>
      <div className={styles.options}>
        <ul className={styles.list}>
          <li>
            <div className={styles.desc}>
              <h2>Notificações no desktop</h2>
              <p>Receba notificação e alertas na sua área de trabalho</p>
            </div>
            <div className={styles.button}>
              {/* <button>Ativar</button> */}
              <Text as="label" size="2">
                <Flex gap="2">
                  <Switch defaultChecked onClick={() => buttonPhone()} /> {onOffPhone ? <p className={styles.label}>Ativar</p> : <p className={styles.label}>Desativar</p>}
                </Flex>
              </Text>
            </div>
          </li>
          <li>
            <div className={styles.desc}>
              <h2>Notificações por E-mail</h2>
              <p>Receba notificação e alertas via E-mail</p>
            </div>
            <div className={styles.button}>
              {/* <button>Ativar</button> */}
              <Text as="label" size="2">
                <Flex gap="2">
                  <Switch defaultChecked onClick={() => buttonEmail()} /> {onOffEmail ? <p className={styles.label}>Ativar</p> : <p className={styles.label}>Desativar</p>}
                </Flex>
              </Text>
            </div>
          </li>
        </ul>
        {/* <ul className={styles.list}>
          <li>
            <div className={styles.desc}>
              <h2>Idioma</h2>
              <select>
                <option>Português</option>
                <option >Inglês</option>
                <option>Espanhol</option>
              </select>
            </div>
          </li>
        </ul> */}

        <h2>Idioma</h2>
        <Select.Root defaultValue="PTBR">
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Label>Idiomas</Select.Label>
              <Select.Item value="PTBR">Português</Select.Item>
              <Select.Item value="EN">Inglês</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </div>
    </div>
  )
}
