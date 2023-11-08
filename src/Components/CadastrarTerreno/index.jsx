/* eslint-disable no-unused-vars */
import styles from './CadastrarTerreno.module.sass'
import { AlertDialog, Button, Flex } from '@radix-ui/themes';

// Components
import Cadastro from './TelaCadastro';

export default function CadastrarTerreno() {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button>Cadastrar Terreno</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content style={{ maxWidth: 750 }} className={styles.Content}>
                {/* <AlertDialog.Title>Revoke access</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    Are you sure? This application will no longer be accessible and any
                    existing sessions will be expired.
                </AlertDialog.Description> */}

                <Cadastro/>

                <Flex gap="3" mt="4" justify="end" className={styles.Flex}>
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray" className={styles.Cancelar}>
                            Cancelar
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        {/* <Button variant="solid" color="red" className={styles.Cadastrar}>
                            Salvar
                        </Button> */}
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}
