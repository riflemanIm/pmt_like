import React from "react";
import { getYearCompany } from "helpers";
import accordionsData from "./accordionsData";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
//import ClientAccordionsHydrate from "./ClientAccordionsHydrate";

export default function Accordions() {
  // Получаем год основания компании на сервере
  const yearCompany = getYearCompany();

  return (
    <Box sx={{ position: "relative", mt: 6 }}>
      {/* "Пузырь" с годом основания */}
      <Box
        component="div"
        sx={{
          position: "absolute",
          top: 108,
          left: "77vw",
          zIndex: 1,
          width: 251,
          height: 251,
          borderRadius: "50%",
          bgcolor: "#5f5c93",
        }}
        data-aos="fade-up"
        data-aos-duration="1200"
        data-aos-delay="300"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            p: 1,
          }}
        >
          <Typography variant="h2" sx={{ color: "#fff", fontSize: 44, m: 0 }}>
            {yearCompany}
          </Typography>
          <Typography variant="body2" sx={{ color: "#fff", mt: 1 }}>
            Компания основана в 1999 году.
          </Typography>
        </Box>
      </Box>

      {/* Аккордеоны */}
      {accordionsData.map((panel) => (
        <Accordion key={panel.id} TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${panel.id}-content`}
            id={`${panel.id}-header`}
          >
            <Typography
              variant="h3"
              sx={{ width: "50%", color: panel.color, flexShrink: 0 }}
            >
              {panel.title}
            </Typography>
            {/* Сводка пунктов, если нужно */}
            {!panel.summaryHidden && panel.summaryItems && (
              <Box component="ul" sx={{ pl: 2, ml: 2 }}>
                {panel.summaryItems.map((item, idx) => (
                  <Typography component="li" key={idx} variant="body2">
                    {item}
                  </Typography>
                ))}
              </Box>
            )}
          </AccordionSummary>

          <AccordionDetails>
            {panel.sections.map((section) => (
              <Box key={section.title} sx={{ mb: 3 }}>
                <Typography variant="h4">{section.title}</Typography>
                {section.subtitle && (
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "text.secondary", mt: 1 }}
                  >
                    {section.subtitle}
                  </Typography>
                )}
                <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                  {section.items.map((item, idx) => (
                    <Typography component="li" key={idx} variant="body2">
                      {item}
                    </Typography>
                  ))}
                </Box>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Клиентская гидрация (если нужна) 
      <ClientAccordionsHydrate />*/}
    </Box>
  );
}
