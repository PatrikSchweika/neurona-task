"use client";

import {PatientList} from "@/src/components/PatientList";
import {usePatients} from "@/src/graphql/queries/patients";

export default function Index() {
  const { data } = usePatients()

  console.log(data)

  return (
      <PatientList data={data?.patients ?? []} />
  )
}
