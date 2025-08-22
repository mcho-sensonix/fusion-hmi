import {gql} from "@urql/core";


export const getSignalQuery = gql`
    query getSignal(
        $signal: SignalPath!
    ) {
        getSignal(signal: $signal) {
            id
            name
            properties

            MostRecentSample {
                timestamp
                arrival_timestamp
                value
            }
        }
    }
`;