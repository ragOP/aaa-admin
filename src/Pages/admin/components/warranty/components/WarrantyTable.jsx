import { Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import TableSkeleton from "../../../../../components/skeleton/TableSkeleton";
import { customDateFormatting } from "../../../../../utils/date/customDateFormatting";
import { useMemo } from "react";
import DataTable from "../../../../../components/data_table";
import SearchBox from "../../../../../components/search_box/SearchBox";
import { ArrowDownTrayIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/outline";

const WarrantyTable = ({
  warrantyData,
  isLoading,
  searchText,
  setSearchText,
}) => {
  const navigate = useNavigate();

  const onChangeText = (e) => {
    setSearchText(e.target.value);
  };

  const onNavigateToPage = () => {
  navigate(`/admin/warranty/create`);
  };

  const onClickTableItem = (_e, data) => {
    navigate(`/admin/warranty/${data?._id}`);
  };

  const filteredWarranties = useMemo(() => {
    return warrantyData.filter((warranty) =>
      Object.values(warranty)
        .join(" ")
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [warrantyData, searchText]);

  const onDownloadWarrantyCeritficatePdf = (e, data) => {
    e.stopPropagation()

    const link = document.createElement("a");
    link.href = data?.warrntyPdf;
    link.download = `${data?.projectName}_warranty_certificate.pdf`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  }

  const onEditWarranty = (e, data) => {
    e.stopPropagation()
    navigate(`/admin/warranty/edit/${data?._id}`);
  }

  const warrantyTableTitles = [
    { value: "companyName", label: "Customer Name", align: "center" },
    { value: "durationInMonths", label: "Duration (Months)", align: "center" },
    { value: "projectName", label: "Project Name", align: "center" },
    { value: "dateOfCommissioining", label: "Date of Commissioning", align: "center" },
    // { value: "createdAt", label: "Created At", align: "center" },
    { value: "updatedAt", label: "Updated At", align: "center" },
    { value: "action", label: "Action", align: "center" },
  ];

  const warrantyRowMapping = {
    title: (data) => <Typography>{data?.title || "-"}</Typography>,
    companyName: (data) => <Typography>{data?.customerName || "-"}</Typography>,
    durationInMonths: (data) => <Typography>{data?.durationInMonths || "-"}</Typography>,
    projectName: (data) => <Typography>{data?.projectName || "-"}</Typography>,
    dateOfCommissioining: (data) => (
      <Typography>
        {customDateFormatting({ date: data?.dateOfCommissioning }) || "-"}
      </Typography>
    ),
    // createdAt: (data) => (
    //   <Typography>
    //     {customDateFormatting({ date: data?.createdAt }) || "-"}
    //   </Typography>
    // ),
    updatedAt: (data) => (
      <Typography>
        {customDateFormatting({ date: data?.updatedAt }) || "-"}
      </Typography>
    ),
    action: (data) => (
      <Stack direction="row" alignItems="center" justifyContent="center" gap="0.5rem">
        <IconButton onClick={(e) => onDownloadWarrantyCeritficatePdf(e, data)} sx={{ padding: "0.5rem", width: "fit-content" }}>
          <Tooltip arrow title="Download">
            <ArrowDownTrayIcon style={{ width: 20, height: 20, strokeWidth: 2 }} />
          </Tooltip>
        </IconButton>
        <IconButton onClick={(e) => onEditWarranty(e, data)} sx={{ padding: "0.5rem", width: "fit-content" }}>
          <Tooltip arrow title="Edit">
            <PencilIcon style={{ width: 20, height: 20, strokeWidth: 2 }} />
          </Tooltip>
        </IconButton>
      </Stack>
    ),
  };

  return (
    <Stack
      sx={{
        background: "#fff",
        padding: "1rem",
        gap: "0.5rem",
        borderRadius: "0.75rem",
        height: "100%",
        overflow: "auto",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack>
          <Typography>
            Showing {filteredWarranties?.length || 0} warranties
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ gap: "1rem", width: "40%" }}
        >
          <SearchBox
            onChange={onChangeText}
            value={searchText}
            placeholder="Search warranties"
          />
          <Button
            onClick={onNavigateToPage}
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
            Add Warranty
          </Button>
        </Stack>
      </Stack>

      {isLoading ? (
        <TableSkeleton />
      ) : !isLoading && filteredWarranties.length > 0 ? (
        <DataTable
          data={filteredWarranties}
          tableHeaderList={warrantyTableTitles}
          rowData={warrantyRowMapping}
          pagination={{
            flag: false,
            currentPage: 1,
            totalPages: Math.ceil(filteredWarranties.length / 10),
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
        />
      ) : !isLoading && filteredWarranties.length === 0 ? (
        <Typography>
          {searchText === "" ? "No data present" : "No data found"}
        </Typography>
      ) : null}
    </Stack>
  );
};

export default WarrantyTable;