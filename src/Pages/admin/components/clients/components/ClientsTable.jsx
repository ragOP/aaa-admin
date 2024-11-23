import React, { useMemo } from "react";
import { Button, Stack, Typography } from "@mui/material";
import DataTable from "../../../../../components/data_table";
import SearchBox from "../../../../../components/search_box/SearchBox";
import TableSkeleton from "../../../../../components/skeleton/TableSkeleton";
import { customDateFormatting } from "../../../../../utils/date/customDateFormatting";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";

const ClientsTable = ({
  customersData,
  isLoading,
  searchText,
  setSearchText,
}) => {
  const navigate = useNavigate();

  const onChangeText = (e) => {
    setSearchText(e.target.value);
  };

  const filteredCustomers = useMemo(() => {
    return customersData.filter((complaint) =>
      Object.values(complaint)
        .join(" ")
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [customersData, searchText]);

  const onClickTableItem = (_e, data) => {
    console.log("data", data);
    navigate(`/admin/customers/${data?._id}`);
  };

  const customersTableTitle = [
    { value: "name", label: "Name", align: "left" },
    { value: "username", label: "Username", align: "center" },
    { value: "email", label: "Email", align: "center" },
    { value: "contact_person", label: "Contact person", align: "center" },
    { value: "address", label: "Address", align: "center" },
    { value: "date", label: "Date", align: "center" },
    { value: "gst", label: "GST", align: "center" },
  ];

  const customersRowMapping = {
    name: (data) => <Typography>{data?.name}</Typography>,
    username: (data) => <Typography>{data?.userName}</Typography>,
    email: (data) => <Typography>{data?.email}</Typography>,
    contact_person: (data) => <Typography>{data?.contactPerson}</Typography>,
    address: (data) => <Typography>{data?.address}</Typography>,
    date: (data) => (
      <Typography>{customDateFormatting({ date: data?.createdAt })}</Typography>
    ),
    gst: (data) => <Typography>{data?.gst}</Typography>,
  };

  return (
    <Stack
      sx={{
        background: "#fff",
        padding: "1rem",
        gap: "0.5rem",
        borderRadius: "0.75rem",
        overflow: "hidden",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack>
          <Typography>
            Showing {filteredCustomers.length || 0} customers
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ gap: "1rem", width: "60%" }}
        >
          <SearchBox
            onChange={onChangeText}
            value={searchText}
            placeholder="Search customer"
          />
          <Button
            variant="contained"
            startIcon={
              <PlusIcon style={{ width: 16, height: 16, strokeWidth: 2 }} />
            }
            sx={{
              whiteSpace: "nowrap",
              width: "auto",
              flexShrink: 0,
              textTransform: "none",
            }}
          >
            Add Customer
          </Button>
        </Stack>
      </Stack>

      {isLoading ? (
        <TableSkeleton />
      ) : filteredCustomers.length > 0 ? (
        <DataTable
          data={customersData}
          tableHeaderList={customersTableTitle}
          rowData={customersRowMapping}
          pagination={{
            flag: false,
            currentPage: 1,
            totalPages: Math.ceil(300 / 10),
            // onChange: onPageChange,
          }}
          onClick={(e, data) => onClickTableItem(e, data)}
          tableSx={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": {
              width: 0,
              height: 0,
            },
          }}
          // onClick={onTableItemClick}
        />
      ) : (
        <Typography>
          {searchText === "" ? "No data present" : "No data found"}
        </Typography>
      )}
    </Stack>
  );
};

export default ClientsTable;
