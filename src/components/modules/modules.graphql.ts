import { gql } from "@urql/core";

export const getSignalQuery = gql`
    query getSignal(
        $signal: SignalPath!
    ) {
        getSignal(signal: $signal) {
            id
            name
            MostRecentSample {
                timestamp
                arrival_timestamp
                value
            }
            sample_results_for_graph{
                samples
                start_time
            }
            sample_results_zipped {
                batch_result {
                    batch_size
                    batch_number
                    current_batch_size
                }
                start_time
                t
                v
            }
        }
    }
`;
export const getSignalsQuery = gql`
    query getSignals(
        $signals: [SignalPath]!
    ) {
        getSignals(signals: $signals) {
            id
            name
            properties
            MostRecentSample {
                timestamp
                arrival_timestamp
                value
            }
               {
                samples
                start_time
            }
            
        }
    }
`;

export const getFilteredSignalsQuery = gql`
    query getFilteredSignals ($parentGroup: GroupPath!, $filter: PropertiesFilterInput) {
        getFilteredSignals(input: $filter, parentGroup: $parentGroup) {
            id
            name
            properties
            sample_results_for_graph{
                samples
                start_time
            }
        }
    }`

export const getFilteredGroupsQuery = gql`
    query getFilteredGroups ($parentGroup: GroupPath!, $filter: PropertiesFilterInput) {
    getFilteredGroups(input: $filter, parentGroup: $parentGroup) {
        id
        name
        properties
        
    }
}`

export const replicateRemoteSignalQuery = gql`
    query replicateRemoteSignals ($signalPath: SignalPath!) {
    replicateRemoteSignals(signal: $filter, parentGroup: $parentGroup) {
        id
        name
        properties
        
    }
}`

// replicateRemoteSignal(
//   signal: SignalPath!
// ): Boolean!