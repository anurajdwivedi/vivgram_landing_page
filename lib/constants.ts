import {
  ClipboardList,
  Activity,
  Building2,
  ArrowLeftRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  HeartPulse,
  Package,
  FileText,
  AlertTriangle,
  TrendingUp,
  FlaskConical,
  HardHat,
  BarChart3,
  LayoutDashboard,
  GraduationCap,
  Shield,
  ScrollText,
  Cloud,
  Lock,
  Clock,
  KeyRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Navigation ──────────────────────────────────────────
export const getNavLinks = (brand: string) =>
  [
    { label: `Why ${brand}`, href: "#why-vivgram" },
    { label: "Features", href: "#features" },
    { label: "Roles", href: "#roles" },
    { label: "Platform", href: "#platform" },
  ] as const;

export const navLinks = getNavLinks("Vivgram");

// ─── Marquee ─────────────────────────────────────────────
export const marqueeItems = [
  "Real-Time Health Monitoring",
  "Role-Based Security",
  "Automated Task Scheduling",
  "Complete Audit Trails",
  "Facility-Wide Visibility",
  "Disease Trend Analytics",
  "Streamlined Workflows",
  "Multi-Role Dashboards",
  "Inventory Management",
] as const;

// ─── Social Proof ────────────────────────────────────────
export const institutionLogos = [
  "Stanford Research",
  "MIT",
  "Johns Hopkins",
  "Mayo Clinic",
  "NIH",
  "Duke University",
] as const;

export interface SocialMetric {
  label: string;
  value: number;
  suffix: string;
}

export const socialMetrics: SocialMetric[] = [
  { label: "Time Saved on Administration", value: 50, suffix: "%" },
  { label: "Audit Ready, Always", value: 100, suffix: "%" },
  { label: "Platform Uptime", value: 99.9, suffix: "%" },
];

// ─── Benefits Section ────────────────────────────────────
export interface BenefitCard {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const benefits: BenefitCard[] = [
  {
    title: "Unified Task Management",
    description:
      "Schedule, assign, and track daily tasks across all rooms and service areas from a single dashboard. Automate overdue detection and ensure nothing falls through the cracks.",
    icon: ClipboardList,
  },
  {
    title: "Real-Time Health Tracking",
    description:
      "Monitor specimen health with disease trend charts, room-wise breakdowns, and instant alerts. Log observation reports directly from task details with structured digital forms.",
    icon: Activity,
  },
  {
    title: "Facility-Wide Visibility",
    description:
      "See every room, rack, and resource at a glance. Track capacity, utilization, and occupancy in real time across your entire facility. Identify bottlenecks before they become problems.",
    icon: Building2,
  },
  {
    title: "Streamlined Service Requests",
    description:
      "Faculty submit and track transfer, operational, and service requests with complete audit trails. Every request is logged, routed, and traceable from submission to fulfillment.",
    icon: ArrowLeftRight,
  },
  {
    title: "Role-Based Access Control",
    description:
      "Every user sees exactly what they need, from technicians completing daily tasks to coordinators overseeing facility-wide operations. Secure, personalized, and permission-controlled.",
    icon: ShieldCheck,
  },
  {
    title: "100% Audit Ready",
    description:
      "Every action is logged. Every report is traceable. Stay compliant with institutional and regulatory requirements effortlessly with automated audit trails and compliance dashboards.",
    icon: CheckCircle2,
  },
];

// ─── Features Section ────────────────────────────────────
export interface FeatureCard {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const features: FeatureCard[] = [
  {
    title: "Smart Task Scheduling",
    description:
      "Create task groups, set frequency modes, select rooms, and assign date ranges with automated overdue tracking.",
    icon: Calendar,
  },
  {
    title: "Health Observation Reports",
    description:
      "Log rack, cage, faculty, animal type, and disease data directly from task details. Includes litter and deceased reports.",
    icon: HeartPulse,
  },
  {
    title: "Rack & Cage Inventory",
    description:
      "Manage racks with manufacturer, type, and capacity data. Track cage inventory and buffer management.",
    icon: Package,
  },
  {
    title: "Protocol Management",
    description:
      "Full protocol lifecycle, from faculty invitation to director approval. Track species, survival status, and personnel.",
    icon: FileText,
  },
  {
    title: "Overcrowding Alerts",
    description:
      "Automatic detection of overcrowded cages across all rooms with pending and resolved counts.",
    icon: AlertTriangle,
  },
  {
    title: "Performance Analytics",
    description:
      "Completion rates, efficiency scores, and room-level progress tracking to optimize operations.",
    icon: TrendingUp,
  },
];

// ─── Roles Section ───────────────────────────────────────
export interface RoleCard {
  title: string;
  icon: LucideIcon;
  accentColor: string;
  description: string;
  capabilities: string[];
  imagePlaceholder: string;
}

export const roles: RoleCard[] = [
  {
    title: "Technician",
    icon: FlaskConical,
    accentColor: "blue",
    description:
      "{brand} equips technicians with mobile-friendly tools for daily work execution. Access task queues, log data digitally, and complete checklists from any device, anywhere in the facility.",
    capabilities: [
      "View and complete assigned daily tasks across rooms and service areas",
      "Submit health observation reports and log specimen condition data",
      "Manage capacity alerts and flag issues for supervisor review",
    ],
    imagePlaceholder: "Technician Mobile View: Task queues and digital data logging",
  },
  {
    title: "Facility Supervisor",
    icon: HardHat,
    accentColor: "emerald",
    description:
      "{brand} helps facility supervisors manage resources, equipment, and daily operations with full visibility. Schedule maintenance, assign tasks, and monitor utilization.",
    capabilities: [
      "Schedule and assign task groups across rooms with frequency controls",
      "Manage operational workflows and oversee daily facility activities",
      "Monitor room-level task completion and staff assignments",
    ],
    imagePlaceholder: "Facility Supervisor Panel: Resource scheduling and equipment tracking",
  },
  {
    title: "Operations Manager",
    icon: BarChart3,
    accentColor: "purple",
    description:
      "{brand} provides operation managers with the workflow tools they need to coordinate complex, cross-functional research activities. Automate handoffs, track task completion, and maintain real-time visibility into team capacity.",
    capabilities: [
      "Monitor all rooms, manage protocol submissions, and handle service requests",
      "Track facility-wide performance metrics and operational analytics",
      "Generate compliance reports and coordinate cross-team activities",
    ],
    imagePlaceholder: "Operation Manager View: Workflow automation and task coordination",
  },
  {
    title: "Project Coordinator",
    icon: LayoutDashboard,
    accentColor: "amber",
    description:
      "{brand} gives project coordinators a single command center for their entire operation. Monitor study progress, track compliance status across programs, and generate executive-ready reports.",
    capabilities: [
      "Full dashboard access with task statistics, health trends, and inventory data",
      "Oversee lab resource allocation and facility-wide operational status",
      "Coordinate between faculty, supervisors, and institutional leadership",
    ],
    imagePlaceholder: "Project Coordinator Dashboard: Portfolio overview with compliance tracker",
  },
  {
    title: "Faculty Director",
    icon: GraduationCap,
    accentColor: "slate",
    description:
      "{brand} simplifies the administrative burden of research so faculty directors can focus on advancing science. Submit protocols through guided digital forms, track study milestones, and manage team coordination all from one place.",
    capabilities: [
      "Submit and track service requests including transfers and operational needs",
      "Manage research colonies, view assigned protocols, and monitor status",
      "Access personalized dashboard with study-specific information and updates",
    ],
    imagePlaceholder: "Faculty Director Portal: Protocol submission and study lifecycle tracking",
  },
];

// ─── Workflow Section ────────────────────────────────────
export interface WorkflowStep {
  label: string;
  description: string;
}

export const workflowSteps: WorkflowStep[] = [
  {
    label: "Configure",
    description:
      "Set up your facility structure: rooms, racks, resources, and operational areas. Import existing data or start fresh with guided setup wizards.",
  },
  {
    label: "Assign Roles",
    description:
      "Invite team members and assign role-based permissions. Each user gets a tailored dashboard from their first login.",
  },
  {
    label: "Schedule Tasks",
    description:
      "Create task groups with frequency modes, room assignments, and date ranges. Automate recurring workflows.",
  },
  {
    label: "Monitor & Track",
    description:
      "Track task completion, health observations, capacity utilization, and compliance status in real time.",
  },
  {
    label: "Stay Compliant",
    description:
      "Automated audit trails, regulatory documentation, and compliance dashboards keep you inspection-ready at all times.",
  },
  {
    label: "Analyze & Optimize",
    description:
      "Use performance analytics and trend data to optimize operations, allocate resources, and report to leadership.",
  },
];

// ─── Product Preview ─────────────────────────────────────
export const dashboardStats = [
  {
    label: "Active Protocols",
    value: "18",
    change: "+2 this month",
    changeColor: "text-emerald-600",
    icon: FileText,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    label: "Pending Tasks",
    value: "12",
    change: "3 overdue",
    changeColor: "text-amber-600",
    icon: Clock,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    label: "Facility Compliance",
    value: "100%",
    change: "All current",
    changeColor: "text-emerald-600",
    icon: ShieldCheck,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    label: "Rooms Monitored",
    value: "24",
    change: "Full capacity: 2",
    changeColor: "text-amber-600",
    icon: Building2,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
] as const;

export const protocolActivity = [
  {
    name: "Room B3 Inspection",
    status: "In Progress",
    statusColor: "bg-blue-100 text-blue-700",
    date: "2:00 PM",
  },
  {
    name: "Rack Inventory Check",
    status: "Scheduled",
    statusColor: "bg-amber-100 text-amber-700",
    date: "3:30 PM",
  },
  {
    name: "Health Observation, Wing A",
    status: "Completed",
    statusColor: "bg-emerald-100 text-emerald-700",
    date: "11:00 AM",
  },
] as const;

export const complianceItems = [
  "IACUC Documentation: Current",
  "Staff Training: 100% Complete",
  "Facility Inspection: Passed",
] as const;

export const sidebarNavItems = [
  { label: "Dashboard", active: true },
  { label: "Tasks", active: false },
  { label: "Health Reports", active: false },
  { label: "Inventory", active: false },
  { label: "Protocols", active: false },
  { label: "Requests", active: false },
  { label: "Analytics", active: false },
  { label: "Settings", active: false },
] as const;

// ─── Security Section ────────────────────────────────────
export interface SecurityFeature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const securityFeatures: SecurityFeature[] = [
  {
    title: "Role-Based Access Control",
    description:
      "Granular permissions mapped to organizational roles: Technician, Supervisor, Manager, Coordinator, Faculty. Each user sees only what they are authorized to access.",
    icon: Shield,
  },
  {
    title: "Complete Audit Trails",
    description:
      "Every action is automatically logged, timestamped, and permanently recorded. Maintain fully traceable audit histories for regulatory inspections, IACUC reviews, and institutional compliance.",
    icon: ScrollText,
  },
  {
    title: "Cloud Infrastructure",
    description:
      "Hosted on secure, redundant cloud infrastructure with 99.9% uptime SLA. Automated backups, geographic redundancy, and 24/7 monitoring ensure your data is always available and protected.",
    icon: Cloud,
  },
  {
    title: "Data Encryption",
    description:
      "All data encrypted at rest and in transit. Secure authentication, session management, and access controls protect sensitive research and operational information at every level.",
    icon: Lock,
  },
];

export const trustBadges = [
  { label: "100% Audit Ready", icon: ShieldCheck },
  { label: "IACUC Compliant", icon: FileText },
  { label: "99.9% Uptime", icon: Clock },
  { label: "Role-Based Security", icon: KeyRound },
] as const;

// ─── Footer ──────────────────────────────────────────────
export const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Platform Overview", href: "#platform" },
      { label: "Features", href: "#features" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Technicians", href: "#roles" },
      { label: "Facility Supervisors", href: "#roles" },
      { label: "Operations Managers", href: "#roles" },
      { label: "Project Coordinators", href: "#roles" },
      { label: "Faculty Director", href: "#roles" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Contact", href: "#cta" },
    ],
  },
] as const;
