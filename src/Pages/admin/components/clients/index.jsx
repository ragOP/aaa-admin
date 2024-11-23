
import { Grid2, Stack, Typography } from "@mui/material";
import DataCard from "../../../../components/data_card";
import DataTable from "../../../../components/data_table";

const complaintsRowData = [
  {
    name: "Complaint 1",
    contact_person: "John Doe",
    contact_number: "1234567890",
    email: "john.doe@example.com",
    address: "123 Main St, City, Country",
    date: "2024-11-01",
    gst: "GST1234567",
  },
  {
    name: "Complaint 2",
    contact_person: "Jane Smith",
    contact_number: "2345678901",
    email: "jane.smith@example.com",
    address: "456 Secondary St, City, Country",
    date: "2024-11-02",
    gst: "GST2345678",
  },
  {
    name: "Complaint 3",
    contact_person: "Alice Johnson",
    contact_number: "3456789012",
    email: "alice.johnson@example.com",
    address: "789 Tertiary St, City, Country",
    date: "2024-11-03",
    gst: "GST3456789",
  },
  {
    name: "Complaint 4",
    contact_person: "Bob Brown",
    contact_number: "4567890123",
    email: "bob.brown@example.com",
    address: "101 Quaternary St, City, Country",
    date: "2024-11-04",
    gst: "GST4567890",
  },
  {
    name: "Complaint 5",
    contact_person: "Charlie Davis",
    contact_number: "5678901234",
    email: "charlie.davis@example.com",
    address: "202 Quinary St, City, Country",
    date: "2024-11-05",
    gst: "GST5678901",
  },
  {
    name: "Complaint 6",
    contact_person: "David Evans",
    contact_number: "6789012345",
    email: "david.evans@example.com",
    address: "303 Senary St, City, Country",
    date: "2024-11-06",
    gst: "GST6789012",
  },
  {
    name: "Complaint 7",
    contact_person: "Emily Fisher",
    contact_number: "7890123456",
    email: "emily.fisher@example.com",
    address: "404 Septenary St, City, Country",
    date: "2024-11-07",
    gst: "GST7890123",
  },
  {
    name: "Complaint 8",
    contact_person: "Frank Green",
    contact_number: "8901234567",
    email: "frank.green@example.com",
    address: "505 Octonary St, City, Country",
    date: "2024-11-08",
    gst: "GST8901234",
  },
  {
    name: "Complaint 9",
    contact_person: "Grace Harris",
    contact_number: "9012345678",
    email: "grace.harris@example.com",
    address: "606 Nonary St, City, Country",
    date: "2024-11-09",
    gst: "GST9012345",
  },
  {
    name: "Complaint 10",
    contact_person: "Henry Irving",
    contact_number: "0123456789",
    email: "henry.irving@example.com",
    address: "707 Denary St, City, Country",
    date: "2024-11-10",
    gst: "GST0123456",
  },
];

const customers = () => {
  const complaintsTableTitles = [
    { value: "name", label: "Name", align: "left" },
    { value: "contact_person", label: "Person", align: "center" },
    { value: "contact_number", label: "Number", align: "center" },
    { value: "email", label: "Email", align: "center" },
    { value: "address", label: "Address", align: "center" },
    { value: "date", label: "Date", align: "center" },
    { value: "gst", label: "GST", align: "center" },
  ];

  const complaintsRowMapping = {
    name: (data) => <Typography>{data?.name}</Typography>,
    contact_person: (data) => <Typography>{data?.contact_person}</Typography>,
    contact_number: (data) => <Typography>{data?.contact_number}</Typography>,
    email: (data) => <Typography>{data?.email}</Typography>,
    address: (data) => <Typography>{data?.address}</Typography>,
    date: (data) => <Typography>{data?.date}</Typography>,
    gst: (data) => <Typography>{data?.gst}</Typography>,
  };

  return (
    <Stack sx={{ gap: "1rem", padding: "1rem", mb: "1rem" }}>
      <h1 className="text-lg font-medium">Customers</h1>

      <Grid2 container spacing={2}>
        <Grid2 size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
          <DataCard
            info={{
              label: "Total customers",
              total_number: "100",
            }}
          />
        </Grid2>
        <Grid2 size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
          <DataCard
            info={{
              label: "Total customers",
              total_number: "100",
            }}
          />
        </Grid2>
        <Grid2 size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
          <DataCard
            info={{
              label: "Total customers",
              total_number: "100",
            }}
          />
        </Grid2>
      </Grid2>

      <Stack
        sx={{
          background: "#fff",
          padding: "1rem",
          gap: "0.5rem",
          borderRadius: "0.75rem",
          overflow: "hidden",
        }}
      >
        <Stack>
          <h1>Showing 10 customers</h1>
        </Stack>
        <DataTable
          data={complaintsRowData}
          tableHeaderList={complaintsTableTitles}
          rowData={complaintsRowMapping}
          pagination={{
            flag: true,
            currentPage: 1,
            totalPages: Math.ceil(300 / 10),
            // onChange: onPageChange,
          }}
          // onClick={onTableItemClick}
        />
      </Stack>
    </Stack>
  );
};

export default customers;
