import { Button, Stack, Typography, IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router";
import TableSkeleton from "../../../../../components/skeleton/TableSkeleton";
import { customDateFormatting } from "../../../../../utils/date/customDateFormatting";
import { useMemo } from "react";
import DataTable from "../../../../../components/data_table";
import SearchBox from "../../../../../components/search_box/SearchBox";
import { PlusIcon, PencilIcon, EyeIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

const AmcTable = ({
  amcData,
  isLoading,
  searchText,
  setSearchText,
}) => {
  const navigate = useNavigate();

  const onChangeText = (e) => {
    setSearchText(e.target.value);
  };

  const onNavigateToPage = () => {
    navigate(`/admin/amc/create`);
  };

  const onClickTableItem = (_e, data) => {
    navigate(`/admin/amc/${data?._id}`);
  };

  const filteredAmcs = useMemo(() => {
    return amcData.filter((amc) =>
      Object.values(amc)
        .join(" ")
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [amcData, searchText]);

  const amcTableTitles = [
    { value: "companyName", label: "Customer Name", align: "center" },
    { value: "durationInMonths", label: "Duration (Months)", align: "center" },
    { value: "productName", label: "Product Name", align: "center" },
    { value: "dateOfCommissionining", label: "Date of Commissioning", align: "center" },
    { value: "createdAt", label: "Created At", align: "center" },
    { value: "updatedAt", label: "Updated At", align: "center" },
    { value: "amount", label: "Amount", align: "center" },
    { value: "action", label: "Action", align: "center" },
  ];

  const onDownloadAmcCeritficatePdf = (e, data) => {
    e.stopPropagation()

    const link = document.createElement("a");
    link.href = data?.warrntyPdf;
    link.download = "amc_certificate.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  }

  const onEditWarranty = (e, data) => {
    e.stopPropagation()
    navigate(`/admin/amc/edit/${data?._id}`);
  }

  const amcRowMapping = {
    title: (data) => <Typography>{data?.title || "-"}</Typography>,
    companyName: (data) => <Typography>{data?.customerName || "-"}</Typography>,
    durationInMonths: (data) => <Typography>{data?.durationInMonths || "-"}</Typography>,
    productName: (data) => <Typography>{data?.productName || "-"}</Typography>,
    dateOfCommissionining: (data) => (
      <Typography>
        {customDateFormatting({ date: data?.dateOfCommissioning }) || "-"}
      </Typography>
    ),
    createdAt: (data) => (
      <Typography>
        {customDateFormatting({ date: data?.createdAt }) || "-"}
      </Typography>
    ),
    updatedAt: (data) => (
      <Typography>
        {customDateFormatting({ date: data?.updatedAt }) || "-"}
      </Typography>
    ),
    amount: (data) => <Typography>{data?.amount || "-"}</Typography>,
    action: (data) => (
      <Stack direction="row" alignItems="center" justifyContent="center" gap="0.5rem">
        <IconButton onClick={onDownloadAmcCeritficatePdf} sx={{ padding: "0.5rem", width: "fit-content" }}>
          <Tooltip arrow title="Download">
            <ArrowDownTrayIcon style={{ width: 20, height: 20, strokeWidth: 2 }} />
          </Tooltip>
        </IconButton>
        <IconButton onClick={onEditWarranty}  sx={{ padding: "0.5rem", width: "fit-content" }}>
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
            Showing {filteredAmcs?.length || 0} AMCs
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
            placeholder="Search AMCs"
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
            Add AMC
          </Button>
        </Stack>
      </Stack>

      {isLoading ? (
        <TableSkeleton />
      ) : !isLoading && filteredAmcs.length > 0 ? (
        <DataTable
          data={filteredAmcs}
          tableHeaderList={amcTableTitles}
          rowData={amcRowMapping}
          pagination={{
            flag: false,
            currentPage: 1,
            totalPages: Math.ceil(filteredAmcs.length / 10),
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
      ) : !isLoading && filteredAmcs.length === 0 ? (
        <Typography>
          {searchText === "" ? "No data present" : "No data found"}
        </Typography>
      ) : null}
    </Stack>
  );
};

export default AmcTable;