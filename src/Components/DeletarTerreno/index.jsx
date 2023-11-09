import styles from './DeletarTerreno.module.sass'
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { TiDeleteOutline } from 'react-icons/ti'

import axios from 'axios';

export default function Deletar({ terreno }) {

    const url = 'http://localhost:3000/terreno/'

    const handleDelete = () => {
        axios.delete(`${url}${terreno.id}`)
            .then(response => {
                console.log(`Deleted post with ID`);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <TiDeleteOutline className={styles.icon} />
            </AlertDialog.Trigger>
            <AlertDialog.Content className={styles.content} style={{ maxWidth: 450 }}>
                <AlertDialog.Title>Deletar terreno</AlertDialog.Title>
                <AlertDialog.Description size="2" className={styles.description}>
                    Tem certeza que deseja excluir <p className={styles.nome}>{terreno.nome}</p> ?
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray" className={styles.button}>
                            Cancelar
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button variant="solid" color="red" className={styles.excluir} onClick={() => handleDelete()}>
                            Excluir
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}
