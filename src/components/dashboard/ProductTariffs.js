import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ComputerIcon from "@mui/icons-material/Computer";
import DnsIcon from "@mui/icons-material/Dns";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import LensIcon from "@mui/icons-material/Lens";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
const products = [
  {
    name: "Sunil Joshi",
    post: "Web Designer",
    pname: "Elite Admin",
    priority: "Low",
    pbg: "primary.main",
    budget: "3.9",
  },
  {
    name: "Andrew McDownland",
    post: "Project Manager",
    pname: "Real Homes WP Theme",
    priority: "Medium",
    pbg: "secondary.main",
    budget: "24.5",
  },
  {
    name: "Christopher Jamil",
    post: "Project Manager",
    pname: "MedicalPro WP Theme",
    priority: "High",
    pbg: "error.main",
    budget: "12.8",
  },
  {
    name: "Nirav Joshi",
    post: "Frontend Engineer",
    pname: "Hosting Press HTML",
    priority: "Critical",
    pbg: "success.main",
    budget: "2.4",
  },
];

const ProductTariffs = () => {
  return (
    <>
      {" "}
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              Модуль /{" "}
              <span
                sx={(theme) => ({
                  color: theme.palette.primary.dark,
                })}
              >
                опция
              </span>
            </TableCell>
            <TableCell>Тип лицензии</TableCell>
            <TableCell>Compact</TableCell>
            <TableCell>Standart</TableCell>
            <TableCell>Enterprise</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Системное ядро</TableCell>
            <TableCell>
              <ComputerIcon />
            </TableCell>
            <TableCell>
              <LensIcon />
            </TableCell>
            <TableCell>
              <LensIcon />
            </TableCell>
            <TableCell>
              <LensIcon />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Статистика</TableCell>
            <TableCell>
              <ComputerIcon />
            </TableCell>
            <TableCell>
              <LensIcon />
            </TableCell>
            <TableCell>
              <LensIcon />
            </TableCell>
            <TableCell>
              <LensIcon />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Расписание</TableCell>
            <TableCell>
              <ComputerIcon />
            </TableCell>
            <TableCell>
              <LensIcon />
            </TableCell>
            <TableCell>
              <LensIcon />
            </TableCell>
            <TableCell>
              <LensIcon />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Удаленный доступ</TableCell>
            <TableCell>
              <ComputerIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Учет звонков</TableCell>
            <TableCell>
              <ComputerIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Интеграция с call-центром</TableCell>
            <TableCell>
              <DnsIcon />
            </TableCell>
            <TableCell></TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ЭМК</TableCell>
            <TableCell>
              <ComputerIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Интеграция с проф.диктофонами</TableCell>
            <TableCell>
              <ComputerIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell> Экспорт ЭМК в HTML формате</TableCell>
            <TableCell>
              <ComputerIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Лаборатория</TableCell>
            <TableCell>
              <ComputerIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell>
              <LensIcon />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Учет услуг</TableCell>
            <TableCell>
              <ComputerIcon />
            </TableCell>
            <TableCell>
              <LensIcon />
            </TableCell>
            <TableCell>
              <LensIcon />
            </TableCell>
            <TableCell>
              <LensIcon />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Касса</TableCell>
            <TableCell>
              <ComputerIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Интеграция с бух.системой</TableCell>
            <TableCell>
              <DnsIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell>
              <LensIcon />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Аптека</TableCell>
            <TableCell>
              <ComputerIcon />
            </TableCell>
            <TableCell></TableCell>
            <TableCell>
              <LensIcon />
            </TableCell>
            <TableCell>
              <LensIcon />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Розничная аптека</TableCell>
            <TableCell>
              <ComputerIcon />
            </TableCell>
            <TableCell></TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Коечный фонд</TableCell>
            <TableCell>
              <ComputerIcon />
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              <LensIcon />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Репликация</TableCell>
            <TableCell>
              <DnsIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Обработка изображений</TableCell>
            <TableCell>
              <ComputerIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell>
              <LensIcon />
            </TableCell>
            <TableCell>
              <LensIcon />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Поддержка карт видеозахвата</TableCell>
            <TableCell>
              <ComputerIcon />
            </TableCell>
            <TableCell></TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Протокол DICOM</TableCell>
            <TableCell>
              <DnsIcon />
            </TableCell>
            <TableCell></TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell>
              <LensIcon />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Интеграция с приборами по DICOM</TableCell>
            <TableCell>
              <DeveloperBoardIcon />
            </TableCell>
            <TableCell></TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>METASCAN</TableCell>
            <TableCell>
              <DnsIcon />
            </TableCell>
            <TableCell></TableCell>
            <TableCell>
              <LensIcon />
            </TableCell>
            <TableCell>
              <LensIcon />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Однонаправленный драйвер</TableCell>
            <TableCell>
              <DeveloperBoardIcon />
            </TableCell>
            <TableCell></TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Двунаправленный драйвер</TableCell>
            <TableCell>
              <DeveloperBoardIcon />
            </TableCell>
            <TableCell></TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Драйвер на основе ASTM</TableCell>
            <TableCell>
              <DeveloperBoardIcon />
            </TableCell>
            <TableCell></TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Протокол HL7</TableCell>
            <TableCell>
              <DeveloperBoardIcon />
            </TableCell>
            <TableCell></TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Интеграция с PACS</TableCell>
            <TableCell>
              <DeveloperBoardIcon />
            </TableCell>
            <TableCell></TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell>
              <RadioButtonUncheckedIcon />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box my={2} sx={{ display: "flex" }}>
        <LensIcon />
        <Typography variant="body2" ml={1}>
          - Включено в стандартный набор тарифного плана
        </Typography>
      </Box>
      <Box my={2} sx={{ display: "flex" }}>
        <RadioButtonUncheckedIcon />
        <Typography variant="body2" ml={1}>
          - Можно приобрести дополнительно к набору
        </Typography>
      </Box>
    </>
  );
};

export default ProductTariffs;
