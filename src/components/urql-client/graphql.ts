// import { gql } from "@urql/core";
//
// export const CDSUserSignIn = gql`
//   mutation LOGIN($username: String, $password: String) {
//     authenticateBannerUserWithPassword(
//       username: $username
//       password: $password
//     ) {
//       token
//       item {
//         userid
//         username
//       }
//     }
//   }
// `;
//
// export const insertSampleQuery = gql`
//   mutation insertSample($signal: SignalPath!, $sample: InsertableSampleInput!) {
//     insertSample(signal: $signal, sample: $sample) {
//       id
//       signal_id
//       timestamp
//     }
//   }
// `;
//
// export const getSignalQuery = gql`
//   query getSignal(
//     $signal: SignalPath!
//     $getSamplesRequestInput: GetSamplesRequestInput
//   ) {
//     getSignal(signal: $signal) {
//       id
//       name
//       MostRecentSample {
//         timestamp
//         arrival_timestamp
//         value
//       }
//       sample_results_zipped(GetSamplesRequestInput: $getSamplesRequestInput) {
//         batch_result {
//           batch_size
//           batch_number
//           current_batch_size
//         }
//         start_time
//         t
//         v
//       }
//     }
//   }
// `;
