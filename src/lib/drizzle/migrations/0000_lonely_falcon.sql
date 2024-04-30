DO $$ BEGIN
 CREATE TYPE "ActionType" AS ENUM('CREATE_CONTACT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "Icon" AS ENUM('settings', 'chart', 'calendar', 'check', 'chip', 'compass', 'database', 'flag', 'home', 'info', 'link', 'lock', 'messages', 'notification', 'payment', 'power', 'receipt', 'shield', 'star', 'tune', 'videorecorder', 'wallet', ' warning', 'headphone', 'send', 'pipelines', 'person', 'category', 'contact', 'clipboardIcon');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "InvitationStatus" AS ENUM('Accepted', 'Revoked', 'Pending');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "Plan" AS ENUM('price_1', 'price_2');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "Role" AS ENUM('Agency_Owner', 'Agency_Admin', 'Subaccount_User', 'Subaccount_Guest');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "TriggerTypes" AS ENUM('CONTACT_FORM');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Action" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"ActionType" "ActionType" DEFAULT 'CREATE_CONTACT',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"order" integer,
	"laneId" text DEFAULT '0',
	"automationId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "AddOns" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"active" boolean DEFAULT false,
	"priceId" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"agencyId" uuid NOT NULL,
	CONSTRAINT "AddOns_priceId_unique" UNIQUE("priceId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Agency" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"connectAccountId" text DEFAULT '',
	"customerId" text,
	"name" text NOT NULL,
	"agencyLogo" text,
	"companyEmail" text,
	"companyPhone" text,
	"whiteLabel" boolean DEFAULT true,
	"address" text,
	"city" text,
	"zipCode" text,
	"state" text,
	"country" text,
	"goal" integer DEFAULT 5,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "AgencySidebarOption" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text DEFAULT 'Menu',
	"link" text DEFAULT '#',
	"Icon" "Icon" DEFAULT 'info',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"agencyId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Automation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"published" boolean DEFAULT false,
	"triggerId" uuid NOT NULL,
	"subAccountId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "AutomationInstance" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"active" boolean DEFAULT false,
	"automationId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ClassName" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"color" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"customData" text,
	"funnelId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Contact" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"subAccountId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Funnel" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"description" text,
	"published" boolean DEFAULT false,
	"subDomainName" text,
	"favicon" text,
	"liveProducts" text DEFAULT '[]',
	"subAccountId" uuid,
	CONSTRAINT "Funnel_subDomainName_unique" UNIQUE("subDomainName")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "FunnelPage" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"pathName" text DEFAULT '',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"visits" integer DEFAULT 0,
	"content" text,
	"order" integer,
	"previewImage" text,
	"funnelId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Invitation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text,
	"InvitationStatus" "InvitationStatus" DEFAULT 'Pending',
	"Role" "Role" DEFAULT 'Subaccount_User',
	"agencyId" uuid NOT NULL,
	CONSTRAINT "Invitation_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Lane" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"pipeId" uuid NOT NULL,
	"order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" text,
	"name" text NOT NULL,
	"link" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"subAccountId" uuid,
	CONSTRAINT "Media_link_unique" UNIQUE("link")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Notification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"notification" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"agencyId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"subAccountId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Permissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"access" boolean DEFAULT true,
	"userId" uuid,
	"subAccountId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Pipeline" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"subAccount" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "SubAccount" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"connectAccountId" text DEFAULT '',
	"name" text NOT NULL,
	"subAccountLogo" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"companyEmail" text,
	"companyPhone" text,
	"goal" integer DEFAULT 5,
	"address" text,
	"city" text,
	"zipCode" text,
	"state" text,
	"country" text,
	"agencyId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "SubAccountSidebarOption" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text DEFAULT 'Menu',
	"link" text DEFAULT '#',
	"Icon" "Icon" DEFAULT 'info',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"subAccountId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Subscription" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"plan" text,
	"price" text,
	"active" boolean DEFAULT false,
	"priceId" text,
	"customerId" text,
	"currentPeriodEndDate" timestamp with time zone,
	"SubscriptionId" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"agencyId" uuid NOT NULL,
	CONSTRAINT "Subscription_SubscriptionId_unique" UNIQUE("SubscriptionId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Tag" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"subAccount" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Ticket" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"order" integer DEFAULT 0,
	"value" numeric,
	"description" text,
	"laneId" uuid NOT NULL,
	"customerId" uuid NOT NULL,
	"assignedUid" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Trigger" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"TriggerTypes" "TriggerTypes" DEFAULT 'CONTACT_FORM',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"subAccountId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"avatar_url" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"Role" "Role" DEFAULT 'Subaccount_User',
	"agencyId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_AgencyReference" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"agencyId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"subAccountId" uuid NOT NULL,
	"sidebarOption" uuid NOT NULL,
	"invitationId" uuid NOT NULL,
	"notificationId" uuid NOT NULL,
	"subscriptionId" uuid NOT NULL,
	"addOnsId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_AutomationReference" (
	"automationId" uuid NOT NULL,
	"actionId" uuid NOT NULL,
	"autoInstanceId" uuid NOT NULL,
	CONSTRAINT "_AutomationReference_automationId_actionId_autoInstanceId_pk" PRIMARY KEY("automationId","actionId","autoInstanceId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_ContactReference" (
	"contactId" uuid NOT NULL,
	"ticketId" uuid NOT NULL,
	CONSTRAINT "_ContactReference_contactId_ticketId_pk" PRIMARY KEY("contactId","ticketId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_FunnelReference" (
	"funnelId" uuid NOT NULL,
	"funnelPageId" uuid NOT NULL,
	"ClassNameId" uuid NOT NULL,
	CONSTRAINT "_FunnelReference_funnelId_funnelPageId_ClassNameId_pk" PRIMARY KEY("funnelId","funnelPageId","ClassNameId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_LaneReference" (
	"laneId" uuid NOT NULL,
	"ticketId" uuid NOT NULL,
	CONSTRAINT "_LaneReference_laneId_ticketId_pk" PRIMARY KEY("laneId","ticketId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_PipelineReference" (
	"pipeId" uuid NOT NULL,
	"laneId" uuid NOT NULL,
	CONSTRAINT "_PipelineReference_pipeId_laneId_pk" PRIMARY KEY("pipeId","laneId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_SubAccountReference" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"subAccountId" uuid NOT NULL,
	"sidebarOption" uuid NOT NULL,
	"permissionsId" uuid NOT NULL,
	"funnelId" uuid NOT NULL,
	"mediaId" uuid NOT NULL,
	"contactId" uuid NOT NULL,
	"triggerId" uuid NOT NULL,
	"automationId" uuid NOT NULL,
	"pipelineId" uuid NOT NULL,
	"tagId" uuid NOT NULL,
	"notificationId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_TagReference" (
	"tagId" uuid NOT NULL,
	"ticketId" uuid NOT NULL,
	CONSTRAINT "_TagReference_tagId_ticketId_pk" PRIMARY KEY("tagId","ticketId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_TicketReference" (
	"ticketId" uuid NOT NULL,
	"tagId" uuid NOT NULL,
	CONSTRAINT "_TicketReference_ticketId_tagId_pk" PRIMARY KEY("ticketId","tagId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_TriggerReference" (
	"triggerId" uuid NOT NULL,
	"automationId" uuid NOT NULL,
	CONSTRAINT "_TriggerReference_triggerId_automationId_pk" PRIMARY KEY("triggerId","automationId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_UserReference" (
	"userId" uuid NOT NULL,
	"permissionId" uuid,
	"ticketId" uuid,
	"notificationId" uuid,
	CONSTRAINT "_UserReference_userId_permissionId_ticketId_notificationId_pk" PRIMARY KEY("userId","permissionId","ticketId","notificationId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Action" ADD CONSTRAINT "Action_automationId_Automation_id_fk" FOREIGN KEY ("automationId") REFERENCES "Automation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "AddOns" ADD CONSTRAINT "AddOns_agencyId_Agency_id_fk" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "AgencySidebarOption" ADD CONSTRAINT "AgencySidebarOption_agencyId_Agency_id_fk" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Automation" ADD CONSTRAINT "Automation_triggerId_Trigger_id_fk" FOREIGN KEY ("triggerId") REFERENCES "Trigger"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Automation" ADD CONSTRAINT "Automation_subAccountId_SubAccount_id_fk" FOREIGN KEY ("subAccountId") REFERENCES "SubAccount"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "AutomationInstance" ADD CONSTRAINT "AutomationInstance_automationId_Automation_id_fk" FOREIGN KEY ("automationId") REFERENCES "Automation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ClassName" ADD CONSTRAINT "ClassName_funnelId_Funnel_id_fk" FOREIGN KEY ("funnelId") REFERENCES "Funnel"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Contact" ADD CONSTRAINT "Contact_subAccountId_SubAccount_id_fk" FOREIGN KEY ("subAccountId") REFERENCES "SubAccount"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Funnel" ADD CONSTRAINT "Funnel_subAccountId_SubAccount_id_fk" FOREIGN KEY ("subAccountId") REFERENCES "SubAccount"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "FunnelPage" ADD CONSTRAINT "FunnelPage_funnelId_Funnel_id_fk" FOREIGN KEY ("funnelId") REFERENCES "Funnel"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_agencyId_Agency_id_fk" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Lane" ADD CONSTRAINT "Lane_pipeId_Pipeline_id_fk" FOREIGN KEY ("pipeId") REFERENCES "Pipeline"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Media" ADD CONSTRAINT "Media_subAccountId_SubAccount_id_fk" FOREIGN KEY ("subAccountId") REFERENCES "SubAccount"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Notification" ADD CONSTRAINT "Notification_agencyId_Agency_id_fk" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Notification" ADD CONSTRAINT "Notification_subAccountId_SubAccount_id_fk" FOREIGN KEY ("subAccountId") REFERENCES "SubAccount"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Permissions" ADD CONSTRAINT "Permissions_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Permissions" ADD CONSTRAINT "Permissions_subAccountId_SubAccount_id_fk" FOREIGN KEY ("subAccountId") REFERENCES "SubAccount"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Pipeline" ADD CONSTRAINT "Pipeline_subAccount_SubAccount_id_fk" FOREIGN KEY ("subAccount") REFERENCES "SubAccount"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "SubAccount" ADD CONSTRAINT "SubAccount_agencyId_Agency_id_fk" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "SubAccountSidebarOption" ADD CONSTRAINT "SubAccountSidebarOption_subAccountId_SubAccount_id_fk" FOREIGN KEY ("subAccountId") REFERENCES "SubAccount"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_agencyId_Agency_id_fk" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Tag" ADD CONSTRAINT "Tag_subAccount_SubAccount_id_fk" FOREIGN KEY ("subAccount") REFERENCES "SubAccount"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_laneId_Lane_id_fk" FOREIGN KEY ("laneId") REFERENCES "Lane"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_customerId_Contact_id_fk" FOREIGN KEY ("customerId") REFERENCES "Contact"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_assignedUid_User_id_fk" FOREIGN KEY ("assignedUid") REFERENCES "User"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_subAccountId_SubAccount_id_fk" FOREIGN KEY ("subAccountId") REFERENCES "SubAccount"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "User" ADD CONSTRAINT "User_agencyId_Agency_id_fk" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_AgencyReference" ADD CONSTRAINT "_AgencyReference_agencyId_Agency_id_fk" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_AgencyReference" ADD CONSTRAINT "_AgencyReference_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_AgencyReference" ADD CONSTRAINT "_AgencyReference_subAccountId_SubAccount_id_fk" FOREIGN KEY ("subAccountId") REFERENCES "SubAccount"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_AgencyReference" ADD CONSTRAINT "_AgencyReference_sidebarOption_AgencySidebarOption_id_fk" FOREIGN KEY ("sidebarOption") REFERENCES "AgencySidebarOption"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_AgencyReference" ADD CONSTRAINT "_AgencyReference_invitationId_Invitation_id_fk" FOREIGN KEY ("invitationId") REFERENCES "Invitation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_AgencyReference" ADD CONSTRAINT "_AgencyReference_notificationId_Notification_id_fk" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_AgencyReference" ADD CONSTRAINT "_AgencyReference_subscriptionId_Subscription_id_fk" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_AgencyReference" ADD CONSTRAINT "_AgencyReference_addOnsId_AddOns_id_fk" FOREIGN KEY ("addOnsId") REFERENCES "AddOns"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_AutomationReference" ADD CONSTRAINT "_AutomationReference_automationId_Automation_id_fk" FOREIGN KEY ("automationId") REFERENCES "Automation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_AutomationReference" ADD CONSTRAINT "_AutomationReference_actionId_Action_id_fk" FOREIGN KEY ("actionId") REFERENCES "Action"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_AutomationReference" ADD CONSTRAINT "_AutomationReference_autoInstanceId_AutomationInstance_id_fk" FOREIGN KEY ("autoInstanceId") REFERENCES "AutomationInstance"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_ContactReference" ADD CONSTRAINT "_ContactReference_contactId_Contact_id_fk" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_ContactReference" ADD CONSTRAINT "_ContactReference_ticketId_Ticket_id_fk" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_FunnelReference" ADD CONSTRAINT "_FunnelReference_funnelId_Funnel_id_fk" FOREIGN KEY ("funnelId") REFERENCES "Funnel"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_FunnelReference" ADD CONSTRAINT "_FunnelReference_funnelPageId_FunnelPage_id_fk" FOREIGN KEY ("funnelPageId") REFERENCES "FunnelPage"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_FunnelReference" ADD CONSTRAINT "_FunnelReference_ClassNameId_ClassName_id_fk" FOREIGN KEY ("ClassNameId") REFERENCES "ClassName"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_LaneReference" ADD CONSTRAINT "_LaneReference_laneId_Lane_id_fk" FOREIGN KEY ("laneId") REFERENCES "Lane"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_LaneReference" ADD CONSTRAINT "_LaneReference_ticketId_Ticket_id_fk" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_PipelineReference" ADD CONSTRAINT "_PipelineReference_pipeId_Pipeline_id_fk" FOREIGN KEY ("pipeId") REFERENCES "Pipeline"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_PipelineReference" ADD CONSTRAINT "_PipelineReference_laneId_Lane_id_fk" FOREIGN KEY ("laneId") REFERENCES "Lane"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_SubAccountReference" ADD CONSTRAINT "_SubAccountReference_subAccountId_SubAccount_id_fk" FOREIGN KEY ("subAccountId") REFERENCES "SubAccount"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_SubAccountReference" ADD CONSTRAINT "_SubAccountReference_sidebarOption_SubAccountSidebarOption_id_fk" FOREIGN KEY ("sidebarOption") REFERENCES "SubAccountSidebarOption"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_SubAccountReference" ADD CONSTRAINT "_SubAccountReference_permissionsId_Permissions_id_fk" FOREIGN KEY ("permissionsId") REFERENCES "Permissions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_SubAccountReference" ADD CONSTRAINT "_SubAccountReference_funnelId_Funnel_id_fk" FOREIGN KEY ("funnelId") REFERENCES "Funnel"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_SubAccountReference" ADD CONSTRAINT "_SubAccountReference_mediaId_Media_id_fk" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_SubAccountReference" ADD CONSTRAINT "_SubAccountReference_contactId_Contact_id_fk" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_SubAccountReference" ADD CONSTRAINT "_SubAccountReference_triggerId_Trigger_id_fk" FOREIGN KEY ("triggerId") REFERENCES "Trigger"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_SubAccountReference" ADD CONSTRAINT "_SubAccountReference_automationId_Automation_id_fk" FOREIGN KEY ("automationId") REFERENCES "Automation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_SubAccountReference" ADD CONSTRAINT "_SubAccountReference_pipelineId_Pipeline_id_fk" FOREIGN KEY ("pipelineId") REFERENCES "Pipeline"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_SubAccountReference" ADD CONSTRAINT "_SubAccountReference_tagId_Tag_id_fk" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_SubAccountReference" ADD CONSTRAINT "_SubAccountReference_notificationId_Notification_id_fk" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_TagReference" ADD CONSTRAINT "_TagReference_tagId_Tag_id_fk" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_TagReference" ADD CONSTRAINT "_TagReference_ticketId_Ticket_id_fk" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_TicketReference" ADD CONSTRAINT "_TicketReference_ticketId_Ticket_id_fk" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_TicketReference" ADD CONSTRAINT "_TicketReference_tagId_Tag_id_fk" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_TriggerReference" ADD CONSTRAINT "_TriggerReference_triggerId_Trigger_id_fk" FOREIGN KEY ("triggerId") REFERENCES "Trigger"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_TriggerReference" ADD CONSTRAINT "_TriggerReference_automationId_Automation_id_fk" FOREIGN KEY ("automationId") REFERENCES "Automation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_UserReference" ADD CONSTRAINT "_UserReference_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_UserReference" ADD CONSTRAINT "_UserReference_permissionId_Permissions_id_fk" FOREIGN KEY ("permissionId") REFERENCES "Permissions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_UserReference" ADD CONSTRAINT "_UserReference_ticketId_Ticket_id_fk" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_UserReference" ADD CONSTRAINT "_UserReference_notificationId_Notification_id_fk" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
