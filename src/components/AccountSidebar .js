import React, { useState } from "react";
import { Drawer } from "antd";
import { XMarkIcon } from "@heroicons/react/24/outline";

function Card({
  title,
  description,
  filteredSubGroups,
  showCreateSubGroupButton,
}) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        className="bg-white overflow-hidden sm:rounded-lg"
        style={{
          width: "350px",
          background: showCreateSubGroupButton ? "#F6F6F4" : "#fff",
        }}
      >
        <div className="px-4 py-5 sm:px-6">
          {showCreateSubGroupButton && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src="../images/name.svg" width={150} alt="Placeholder" />
            </div>
          )}
          {showCreateSubGroupButton && (
            <>
              <h3
                className="
              text-lg
              font-medium
              leading-6
              text-gray-900
              text-center
              mt-6
              "
                style={{
                  fontFamily: "outFit, san-sarif",
                  fontWeight: "600",
                  fontSize: "24px",
                  color: "#505050",
                }}
              >
                {title}
              </h3>
              <p
                className="
                mt-1
                max-w-2xl
                text-sm
                text-gray-500
                text-center
                mt-6
                "
                style={{
                  fontFamily: "outFit, san-sarif",
                  fontSize: "16px",
                  color: "#505050",
                  fontWeight: "400",
                }}
              >
                {description}
              </p>
            </>
          )}
          {showCreateSubGroupButton && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                type="button"
                style={{
                  background: "#4467a1",
                  borderRadius: "20px",
                  padding: "5px 15px 5px 15px",
                  fontFamily: "outFit, san-sarif",
                }}
                className="text-white mt-5"
              >
                + Create SubGroup
              </button>
            </div>
          )}
          {!showCreateSubGroupButton && (
            <div
              style={{
                border: "1px solid #7A7A7A",
                padding: "10px",
                borderRadius: "20px",
                marginTop: "5px",
              }}
            >
              <h2>{filteredSubGroups[0].name}</h2>
              <h3
                style={{
                  margin: "5px",
                  color: "#4467a1",
                  fontSize: "24px",
                  fontWeight: "600",
                  fontFamily: "outFit, san-sarif",
                }}
              >
                SubGroups
              </h3>
              <table className="min-w-full">
                <thead
                  className="
                bg-gray-50
                "
                  style={{ borderRadius: "50px" }}
                >
                  <tr>
                    <th
                      className="
                    px-6
                    py-3
                    text-left
                    text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                    "
                      style={{
                        fontFamily: "outFit, san-sarif",
                        fontWeight: "500",
                      }}
                    >
                      Name
                    </th>
                    <th
                      className="
                    px-6
                    py-3
                    text-left
                    text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                    "
                      style={{
                        fontFamily: "outFit, san-sarif",
                        fontWeight: "500",
                      }}
                    >
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSubGroups.map((subgroup, index) => (
                    <tr key={index}>
                      <td
                        className="
                      px-6
                      py-4
                      whitespace-nowrap
                      text-sm
                      font-medium
                      text-gray-900
                      "
                        style={{
                          fontFamily: "outFit, san-sarif",
                          color: "#505050",
                        }}
                      >
                        {subgroup.subGroupAccount.name}
                      </td>
                      <td
                        className="
                      px-6
                      py-4
                      whitespace-nowrap
                      text-sm
                      font-medium
                      text-gray-900
                      "
                        style={{ fontFamily: "outFit", color: "#505050" }}
                      >
                        {new Date(
                          subgroup.subGroupAccount.dateCreated
                        ).toLocaleDateString("en-US")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AccountSidebar({ account, showForm, subGroups }) {
  const [drawerVisible, setDrawerVisible] = useState(true);

  const groupAccountId = account.id;

  const filteredSubGroups = subGroups.filter(
    (item) => item.groupAccount.id === groupAccountId
  );

  const showCreateSubGroupButton = filteredSubGroups.length === 0;

  return (
    <Drawer
      placement="right"
      closable={false}
      onClose={() => setDrawerVisible(false)}
      visible={drawerVisible}
      width={400}
      style={{ height: "100vh", overflow: "auto" }}
    >
      <div className="px- text-end">
        <button
          type="button"
          onClick={() => setDrawerVisible(false)}
          className="relative rounded-md text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <span className="absolute -inset-2.5" />
          <span className="sr-only">Close panel</span>
          <XMarkIcon
            className="h-10 w-10"
            aria-hidden="true"
            style={{
              color: "#505050",
              marginRight: "15px",
            }}
          />
        </button>
        <div className="flex justify-between mt-5">
          <div>
            <h2
              className="
                text-base
                font-semibold
                leading-6"
              style={{
                fontFamily: "outFit, san-sarif",
                fontWeight: "600",
                fontSize: "36px",
                color: "#505050",
              }}
            >
              {account.name}
            </h2>
          </div>
        </div>

        <div
          className="mt-5"
          style={{
            textAlign: "start",
            fontFamily: "outFit, san-sarif",
            color: "#a1a1a1",
          }}
        >
          <p className="text-sm">{account.description}</p>
        </div>
      </div>
      <Card
        title="Let's Organize Further!"
        description="You haven't created any subgroups under Assets yet."
        showCreateSubGroupButton={showCreateSubGroupButton}
        filteredSubGroups={filteredSubGroups}
      />
    </Drawer>
  );
}
