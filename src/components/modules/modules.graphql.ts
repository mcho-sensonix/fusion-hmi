import {gql} from "@urql/core";

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
        $sampleInput: GetSamplesRequestInput
    ) {
        getSignals(signals: $signals) {
            id
            name
            properties
            fullPath
            MostRecentSample {
                timestamp
                arrival_timestamp
                value
            }
            samples (GetSamplesRequestInput: $sampleInput ) {
                samples
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
            fullPath
            samples{
                samples
            }
            MostRecentSample {
                value
            }
        }
    }`

export const getFilteredGroupsQuery = gql`
    query getFilteredGroups ($parentGroup: GroupPath!, $filter: PropertiesFilterInput) {
        getFilteredGroups(input: $filter, parentGroup: $parentGroup) {
            id
            name
            properties
            fullPath

        }
    }`

export const replicateRemoteSignalQuery = gql`
    mutation replicateRemoteSignal ($signal: SignalPath!) {
        replicateRemoteSignal(signal:$signal)
    }`


export const insertSampleQuery = gql`
    mutation insertSample ($signal: SignalPath!, $sample: InsertableSampleInput!) {
        insertSample(
            signal: $signal,
            sample: $sample
        ) {
            signal_id
            timestamp
            arrival_timestamp
            value
            type
        }
    }`

