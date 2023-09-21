import HubIcon from "@mui/icons-material/Hub";
import BusinessIcon from "@mui/icons-material/Business";
import ApiIcon from "@mui/icons-material/Api";
import HandshakeIcon from "@mui/icons-material/Handshake";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import StorageIcon from "@mui/icons-material/Storage";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
const Menuitems = [
  {
    title: "Решения",
    muiIcon: HubIcon,
    icon: "sun",
    href: "/",
  },
  {
    title: "Продукты",
    muiIcon: ApiIcon,
    icon: "briefcase",
    href: "/products",
  },
  {
    title: "Проекты",
    muiIcon: StorageIcon,
    icon: "folder-plus",
    href: "/projects",
  },
  {
    title: "Инновации",
    muiIcon: TipsAndUpdatesIcon,
    icon: "globe",
    href: "/innovations",
  },
  {
    title: "Партнерская программа",
    muiIcon: HandshakeIcon,
    icon: "users",
    href: "/partnership",
  },
  {
    title: "Мобильные решения",
    muiIcon: SmartphoneIcon,
    icon: "smartphone",
    href: "https://mobile.pmtech.ru/",
  },
  {
    title: "Лицензионная политика",
    muiIcon: WorkspacePremiumIcon,
    icon: "award",
    href: "/licenses",
  },
  {
    title: "Документация",
    muiIcon: FolderZipIcon,
    icon: "command",
    href: "/docs",
  },
  {
    title: "О компании",
    icon: "check-circle",
    muiIcon: BusinessIcon,
    href: "/about",
  },
  {
    title: "Контакты",
    muiIcon: PhoneIcon,
    icon: "phone",
    href: "/contacts",
  },
  // {
  //   title: "Вход для пользователя",
  //   muiIcon: PersonIcon,
  //   icon: "user",
  //   href: "https://old.medialog.ru/?action=login",
  // },
];

export default Menuitems;
