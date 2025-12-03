import {PatientList} from "@/src/app/PatientList";
import {query} from "@/src/graphql/setup/apollo-client";
import {PATIENTS_QUERY} from "@/src/graphql/queries/patients";

export default async function Index() {
  const { data } = await query({ query: PATIENTS_QUERY })

  return (
      <div className="flex flex-col gap-4">
          <h1 className="text-3xl">Patient list</h1>
          <PatientList data={data?.patients ?? []} />
      </div>
  )
}
