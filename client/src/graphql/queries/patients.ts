import { gql, TypedDocumentNode } from "@apollo/client";
import {Query, QueryPatientArgs, QueryPatientsArgs} from "@/src/graphql/__generated__/graphql";

export const PATIENTS_QUERY: TypedDocumentNode<Pick<Query, 'patients'>, QueryPatientsArgs> = gql`
    query Patients {
      patients {
        id
        name
        age
        lastDiagnosis {
          id
          date
          title  
          description
          imageUrl
        }
      }
    }
`



export const PATIENT_QUERY: TypedDocumentNode<Pick<Query, 'patient'>, QueryPatientArgs> = gql`
    query Patient($patientId: Int!) {
      patient(patientId: $patientId) {
        id
        name
        age
        diagnoses {
          id
          date
          title
          description
          imageUrl
        }
      }
    }
`

