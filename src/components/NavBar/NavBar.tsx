import '@mantine/core/styles.css';
import {ActionIcon, AppShell, NavLink} from "@mantine/core";
import {IconMenu2} from "@tabler/icons-react";
import {Link} from "react-router-dom";
import {useDisclosure} from "@mantine/hooks";
import {useState} from "react";

export function NavBar(props) {
    const [opened, { toggle }] = useDisclosure();
    const [open, setOpen] = useState(false)

    console.log("Open: ", opened)
    const onOpen = () => {
        console.log("Toggleonc")
        setOpen(open => !open)
        toggle();
    }
    return (
        <>
            <AppShell
                header={{ height: 60 }}
                navbar={{
                    width: 300,
                    breakpoint: 1300,
                    collapsed: { mobile: !open },
                }}
                padding="md"
            >
                <AppShell.Header>
                    <ActionIcon onClick={onOpen} size={"xl"}>
                        <IconMenu2 stroke={2} />
                    </ActionIcon>
                </AppShell.Header>
                <AppShell.Navbar p="md">
                    <NavLink
                        component={Link}
                        to="/"
                        label="Overview"
                        onClick={toggle}
                        // leftSection={<IconHome2 size={16} stroke={1.5} />}
                    />
                    <NavLink
                        component={Link}
                        to="/modules"
                        label="Modules"
                        onClick={toggle}
                        // leftSection={<IconHome2 size={16} stroke={1.5} />}
                    />
                    <NavLink
                        component={Link}
                        to="/data"
                        label="Data"
                        onClick={toggle}
                        // leftSection={<IconHome2 size={16} stroke={1.5} />}
                    />
                </AppShell.Navbar>
                <AppShell.Main>
                    {props.children}
                </AppShell.Main>
            </AppShell>
        </>
    );
};