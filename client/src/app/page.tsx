"use client";

import {PatientList} from "@/src/app/PatientList";
import {usePatients} from "@/src/graphql/queries/patients";

export default function Index() {
  const { data } = usePatients()

  // todo: display loading

  return (
      <div className="flex flex-col gap-4">
          <h1 className="text-3xl">Patient list</h1>
          <PatientList data={data?.patients ?? []} />
      </div>
  )
}
