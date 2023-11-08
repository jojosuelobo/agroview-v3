import styles from './DeletarTerreno.module.sass'
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { TiDeleteOutline } from 'react-icons/ti'

export default function Deletar({terreno}) {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <TiDeleteOutline className={styles.icon}/>
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
                        <Button variant="solid" color="red" className={styles.excluir}>
                            Excluir
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}
