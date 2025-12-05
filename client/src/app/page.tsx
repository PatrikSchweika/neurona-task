"use client";

import {PatientList} from "@/src/app/PatientList";
import {usePatients} from "@/src/graphql/queries/hooks";
import {Button, Tooltip} from "antd";
import {PlusOutlined} from "@ant-design/icons";

export default function Index() {
  const { data, loading } = usePatients()

  return (
      <div className="flex flex-col gap-4">
          <h1 className="text-3xl">Patient list</h1>
          <PatientList data={data?.patients ?? []} loading={loading} />
          <Tooltip title="Add patient" arrow>
              <Button
                  className="mx-auto"
                  type="primary"
                  href="/addPatient"
                  shape="round"
                  icon={<PlusOutlined />}
                  size="large"
              />
          </Tooltip>
      </div>
  )
}
