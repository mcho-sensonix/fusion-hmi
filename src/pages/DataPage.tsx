import '@mantine/core/styles.css';
import {NavBar} from "../components/NavBar/NavBar.tsx";
import {Text} from '@mantine/core'
import {NestedGroupList} from "../components/groups";

export function DataPage() {
    return (
        <>
            <NavBar>
                <Text>Gateway</Text>

                <NestedGroupList group={`$self/`}/>

                <Text>Asset Twin</Text>
                <NestedGroupList group={`$asset_twin/`}/>
            </NavBar>
        </>
    );
};