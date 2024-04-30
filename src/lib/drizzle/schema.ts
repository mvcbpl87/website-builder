import { pgTable, pgEnum, uuid, text, timestamp, boolean, integer, decimal, primaryKey } from "drizzle-orm/pg-core";
import { UserRole } from "../enum";
import { relations } from 'drizzle-orm';
export const Role = pgEnum("Role", [UserRole.AGENCY_ADMIN, UserRole.AGENCY_OWNER, UserRole.SUBACCOUNT_USER, UserRole.SUBACCOUNT_GUEST]);

export const Icon = pgEnum('Icon', ['settings', 'chart', 'calendar', 'check', 'chip', 'compass', 'database', 'flag', 'home', 'info', 'link', 'lock', 'messages', 'notification', 'payment', 'power', 'receipt', 'shield', 'star', 'tune', 'videorecorder', 'wallet', ' warning', 'headphone', 'send', 'pipelines','person', 'category', 'contact','clipboardIcon']);

export const User = pgTable("User", {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').notNull(),
    avatarUrl: text('avatar_url').notNull(),
    email:text('email').notNull(),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', {
        withTimezone: true,
        mode: 'string',
    }),
    role: Role('Role').default("Subaccount_User"),
    agencyId: uuid('agencyId').references(()=>Agency.id, {onDelete:"cascade"}),
});

export const usersRelations = relations(User,({one, many})=>({
    Agency: one(Agency,{
        fields:[User.agencyId],
        references:[Agency.id]
    }),
    Permissions: many(Permissions),
}))

export const _UserReference = pgTable('_UserReference', {
    userId: uuid('userId').notNull().references(()=> User.id, {onDelete:'cascade'}),
    permissionId: uuid('permissionId').references(()=>Permissions.id, {onDelete:'cascade'}),
    ticketId: uuid('ticketId').references(()=>Ticket.id, {onDelete:'cascade'}),
    notificationId: uuid('notificationId').references(()=>Notification.id, {onDelete:'cascade'})
}, table => {
    return { pk: primaryKey({columns: [table.userId, table.permissionId, table.ticketId, table.notificationId]})}
});

export const Permissions = pgTable('Permissions',{
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    email:text('email').notNull(),
    access: boolean('access').default(true),
    userId:uuid('userId').references(()=> User.id, {onDelete:"cascade"}),
    subAccountId: uuid('subAccountId').references(()=>SubAccount.id, {onDelete:'cascade'}),
})

export const PermissionRelations = relations(Permissions, ({one})=>({
    User: one(User,{
        fields:[Permissions.userId],
        references:[User.id]
    }),
    SubAccount: one(SubAccount,{
        fields:[Permissions.subAccountId],
        references:[SubAccount.id]
    })
})) 
export const Agency = pgTable("Agency", {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    connectAccountId: text('connectAccountId').default(""),
    customerId: text('customerId'),
    name: text('name').notNull(),
    agencyLogo: text('agencyLogo'),
    companyEmail: text('companyEmail'),
    companyPhone: text('companyPhone'),
    whiteLabel: boolean('whiteLabel').default(true),
    address: text('address'),
    city: text('city'),
    zipCode: text('zipCode'),
    state: text('state'),
    country: text('country'),
    goal: integer('goal').default(5),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', {
        withTimezone: true,
        mode: 'string',
    }),
});

export const AgencyRelations = relations(Agency, ({one, many})=>({
  User:many(User),
  subAccounts: many(SubAccount)
}))
export const _AgencyReference = pgTable("_AgencyReference", {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    agencyId: uuid('agencyId').notNull().references(()=>Agency.id, {onDelete: 'cascade'}),
    usersId: uuid("userId").notNull().references(()=> User.id, {onDelete: 'cascade'}),
    subAccountId: uuid('subAccountId').notNull().references(()=>SubAccount.id, {onDelete:"cascade"}),
    sidebarOption: uuid('sidebarOption').notNull().references(()=>AgencySidebarOption.id, {onDelete:'cascade'}),
    invitationId: uuid('invitationId').notNull().references(()=>Invitation.id, {onDelete:'cascade'}),
    notificationId: uuid("notificationId").notNull().references(()=>Notification.id, {onDelete:"cascade"}),
    subscriptionId: uuid('subscriptionId').notNull().references(()=>Subscription.id, {onDelete:"cascade"}),
    addOnsId: uuid('addOnsId').notNull().references(()=> AddOns.id, { onDelete:"cascade"})
}, 
// t => ( {pk: primaryKey({columns: [t.agencyId, t.usersId, t.subAccountId, t.sidebarOption, t.invitationId, t.notificationId, t.subscriptionId, t.addOnsId ]})})
)

export const SubAccount = pgTable("SubAccount",{
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    connectAccountId: text('connectAccountId').default(""),
    name: text('name').notNull(),
    subAccountLogo: text('subAccountLogo'),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', {
        withTimezone: true,
        mode: 'string',
    }),
    companyEmail: text('companyEmail'),
    companyPhone: text('companyPhone'),
    goal: integer('goal').default(5),
    address: text('address'),
    city: text('city'),
    zipCode: text('zipCode'),
    state: text('state'),
    country: text('country'),
    agencyId: uuid('agencyId').notNull().references(()=> Agency.id, { onDelete: 'cascade'}),
});

export const SubAccountRelations = relations(SubAccount,({one, many})=>({
    Agency: one(Agency, {
        fields: [SubAccount.agencyId],
        references:[Agency.id]
    }),
    Permissions:many(Permissions)
}))
export const _SubAccountReference = pgTable("_SubAccountReference", {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    subAccoutId: uuid('subAccountId').notNull().references(()=> SubAccount.id, {onDelete: 'cascade'}),
    sidebarOption: uuid('sidebarOption').notNull().references(()=> SubAccountSidebarOption.id, { onDelete: "cascade"}),
    permissionsId : uuid('permissionsId').notNull().references(()=> Permissions.id, { onDelete: 'cascade'}),
    funnelId: uuid('funnelId').notNull().references(()=> Funnel.id, {onDelete:'cascade'}),
    mediaId: uuid('mediaId').notNull().references(()=>Media.id, { onDelete: 'cascade'}),
    contactId: uuid('contactId').notNull().references(()=> Contact.id, {onDelete: 'cascade'}),
    triggerId: uuid('triggerId').notNull().references(()=> Trigger.id, {onDelete: 'cascade'}),
    automationId: uuid('automationId').notNull().references(()=> Automation.id, {onDelete:'cascade'}),
    pipelineId: uuid('pipelineId').notNull().references(()=> Pipeline.id, {onDelete: 'cascade'}),
    tagId: uuid('tagId').notNull().references(()=>Tag.id, { onDelete: 'cascade'}),
    notificationId: uuid('notificationId').notNull().references(()=> Notification.id, { onDelete: 'cascade'}),
}, 
// t => ( { pk: primaryKey({columns: [t.subAccoutId, t.sidebarOption, t.permissionsId, t.funnelId, t.mediaId, t.contactId, t.triggerId, t.automationId, t.pipelineId, t.tagId, t.notificationId,] } )})
)

export const Tag = pgTable("Tag",{
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').notNull(),
    color: text('name'),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', {
        withTimezone: true,
        mode: 'string',
    }),
    subAccount: uuid('subAccount').notNull().references(()=>SubAccount.id, {onDelete: 'cascade'})
})

export const _TagReference = pgTable('_TagReference', {
    tagId: uuid('tagId').notNull().references(()=>Tag.id, {onDelete:'cascade'}),
    ticketId: uuid('ticketId').notNull().references(()=> Ticket.id, { onDelete: 'cascade'}),
}, t => ( { pk: primaryKey({columns: [t.tagId, t.ticketId] }) }))

export const Pipeline = pgTable('Pipeline', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').notNull(),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', {
        withTimezone: true,
        mode: 'string',
    }),
    subAccount: uuid('subAccount').notNull().references(()=>SubAccount.id, {onDelete: 'cascade'})
})

export const _PipelineReference = pgTable('_PipelineReference', {
    pipeId: uuid('pipeId').notNull().references(()=>Pipeline.id, {onDelete:'cascade'}),
    laneId: uuid('laneId').notNull().references(()=> Lane.id, { onDelete: 'cascade'}),
}, t => ({ pk: primaryKey({columns:[t.pipeId, t.laneId]}) }) )

export const Lane = pgTable("Lane", {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').notNull(),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', {
        withTimezone: true,
        mode: 'string',
    }),
    pipeId: uuid('pipeId').notNull().references(()=>Pipeline.id, {onDelete:'cascade'}),
    order: integer('order').default(0),
});

export const _LaneReference = pgTable('_LaneReference', {
    laneId: uuid('laneId').notNull().references(()=> Lane.id, { onDelete: 'cascade'}),
    ticketId: uuid('ticketId').notNull().references(()=> Ticket.id, { onDelete: 'cascade'}),
}, t => ({ pk:primaryKey({columns:[t.laneId, t.ticketId]}) }) );

export const Ticket = pgTable('Ticket', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').notNull(),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', {
        withTimezone: true,
        mode: 'string',
    }),
    order: integer('order').default(0),
    value: decimal('value'),
    description: text('description'),
    laneId: uuid('laneId').notNull().references(()=> Lane.id, { onDelete: 'cascade'}),
    customerId: uuid('customerId').notNull().references(()=> Contact.id, { onDelete: 'cascade' }),
    assignedUid: uuid('assignedUid').notNull().references(()=> User.id, { onDelete: 'cascade'}),
})

export const _TicketReference = pgTable('_TicketReference',{
    ticketId: uuid('ticketId').notNull().references(()=> Ticket.id, { onDelete: 'cascade'}),
    tagId: uuid('tagId').notNull().references(()=>Tag.id, {onDelete:'cascade'}),
}, t => ({ pk: primaryKey({columns:[t.ticketId, t.tagId]}) }) )

export const TriggerTypes = pgEnum('TriggerTypes', ['CONTACT_FORM']);

export const Trigger = pgTable('Trigger', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').notNull(),
    type: TriggerTypes('TriggerTypes').default("CONTACT_FORM"),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', {
        withTimezone: true,
        mode: 'string',
    }),
    subAccountId: uuid('subAccountId').references(()=>SubAccount.id,{onDelete:'cascade'}),
})

export const _TriggerReference = pgTable('_TriggerReference',{
    triggerId: uuid('triggerId').notNull().references(()=>Trigger.id, { onDelete: 'cascade'}),
    automationId: uuid('automationId').notNull().references(()=> Automation.id, {onDelete: 'cascade'}),
}, t => ({ pk: primaryKey({columns:[t.triggerId, t.automationId]}) }))

export const Automation = pgTable('Automation',{
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').notNull(),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', {
        withTimezone: true,
        mode: 'string',
    }),
    published:boolean('published').default(false),
    triggerId: uuid('triggerId').notNull().references(()=>Trigger.id, { onDelete: 'cascade'}),
    subAccountId: uuid('subAccountId').references(()=>SubAccount.id,{onDelete:'cascade'}),
});

export const _AutomationReference = pgTable('_AutomationReference',{
    automationId: uuid('automationId').notNull().references(()=> Automation.id, {onDelete: 'cascade'}),
    actionId: uuid('actionId').notNull().references(()=>Action.id, { onDelete: "cascade"}),
    autoInstanceId: uuid('autoInstanceId').notNull().references(()=> AutomationInstance.id, {onDelete:'cascade'}),
}, t => ({ pk: primaryKey({columns:[t.automationId, t.actionId, t.autoInstanceId]}) }))


export const AutomationInstance = pgTable('AutomationInstance',{
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', {
        withTimezone: true,
        mode: 'string',
    }),
    active: boolean('active').default(false),
    automationId: uuid('automationId').notNull().references(()=> Automation.id, {onDelete: 'cascade'}),
});

export const ActionType = pgEnum('ActionType', ['CREATE_CONTACT']);

export const Action = pgTable('Action', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').notNull(),
    type: ActionType("ActionType").default("CREATE_CONTACT"),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', {
        withTimezone: true,
        mode: 'string',
    }),
    order: integer('order'),
    laneId:text('laneId').default("0"),
    automationId: uuid('automationId').notNull().references(()=> Automation.id, {onDelete: 'cascade'}),
})

export const Contact = pgTable('Contact',{
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', {
        withTimezone: true,
        mode: 'string',
    }),
    subAccountId: uuid('subAccountId').references(()=>SubAccount.id,{onDelete:'cascade'}),
})

export const _ContactReference = pgTable('_ContactReference', {
    contactId: uuid('contactId').notNull().references(()=> Contact.id, { onDelete: 'cascade'}),
    ticketId: uuid('ticketId').notNull().references(()=> Ticket.id, { onDelete: 'cascade'}),
}, t => ({ pk: primaryKey({columns:[t.contactId, t.ticketId]}) }))

export const Media = pgTable('Media', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    type: text('type'),
    name: text('name').notNull(),
    link: text('link').notNull().unique(),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', {
        withTimezone: true,
        mode: 'string',
    }),
    subAccountId: uuid('subAccountId').references(()=>SubAccount.id,{onDelete:'cascade'}),
})

export const Funnel = pgTable('Funnel',{
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').notNull(),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', {
        withTimezone: true,
        mode: 'string',
    }),
    description: text('description'),
    published: boolean('published').default(false),
    subDomainName: text('subDomainName').unique(),
    favicon: text('favicon'),
    liveProducts: text('liveProducts').default('[]'),
    subAccountId: uuid('subAccountId').references(()=>SubAccount.id,{onDelete:'cascade'}),
})

export const _FunnelReference = pgTable('_FunnelReference', {
    funnelId: uuid('funnelId').notNull().references(()=> Funnel.id, { onDelete: "cascade"}),
    funnelPageId: uuid("funnelPageId").notNull().references(()=> FunnelPage.id, { onDelete: 'cascade'}),
    ClassNameId: uuid('ClassNameId').notNull().references(()=> ClassName.id, { onDelete: 'cascade'})
}, t => ({ pk: primaryKey({columns:[t.funnelId, t.funnelPageId, t.ClassNameId]}) }))


export const ClassName = pgTable('ClassName',{
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').notNull(),
    color: text('color').notNull(),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', {
        withTimezone: true,
        mode: 'string',
    }), 
    customData: text('customData'),
    funnelId: uuid('funnelId').notNull().references(()=> Funnel.id, { onDelete: "cascade"}),
});

export const FunnelPage = pgTable('FunnelPage',{
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').notNull(),
    pathName: text('pathName').default(""),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', {
        withTimezone: true,
        mode: 'string',
    }), 
    visits: integer('visits').default(0),
    content: text('content'),
    order: integer('order'),
    previewImage: text('previewImage'),
    funnelId: uuid('funnelId').notNull().references(()=> Funnel.id, { onDelete: "cascade"}),
})

export const AgencySidebarOption = pgTable("AgencySidebarOption",{
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').default('Menu'),
    link: text('link').default('#'),
    icon: Icon('Icon').default("info"),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', {
        withTimezone: true,
        mode: 'string',
    }), 
    agencyId: uuid('agencyId').references(()=>Agency.id, {onDelete:"cascade"}),
});

export const SubAccountSidebarOption = pgTable('SubAccountSidebarOption',{
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').default('Menu'),
    link: text('link').default('#'),
    icon: Icon('Icon').default("info"),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', {
        withTimezone: true,
        mode: 'string',
    }), 
    subAccountId: uuid('subAccountId').references(()=>SubAccount.id, {onDelete:'cascade'}),
})

export const InvitationStatus = pgEnum('InvitationStatus', ['Accepted', 'Revoked', 'Pending']);

export const Invitation = pgTable('Invitation',{
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    email:text('email').unique(),
    status: InvitationStatus('InvitationStatus').default("Pending"),
    role: Role('Role').default("Subaccount_User"),
    agencyId: uuid('agencyId').notNull().references(()=>Agency.id),
})

export const Notification = pgTable('Notification',{
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    notification: text('notification'),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', {
        withTimezone: true,
        mode: 'string',
    }), 
    agencyId: uuid('agencyId').notNull().references(()=>Agency.id, {onDelete: 'cascade'}),
    usersId: uuid("userId").notNull().references(()=> User.id,  {onDelete: 'cascade'}),
    subAccountId: uuid('subAccountId').notNull().references(()=>SubAccount.id, {onDelete:"cascade"}),

});

// Change Stripe price id
export const Plan = pgEnum('Plan', ['price_1', 'price_2']);

export const Subscription = pgTable('Subscription', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    plan: text('plan'),
    price: text('price'),
    active: boolean('active').default(false),
    priceId: text('priceId'),
    customerId: text('customerId'),
    currentPeriodEndDate: timestamp('currentPeriodEndDate', {
        withTimezone: true,
        mode: 'string',
    }),
    SubscriptionId: text('SubscriptionId').unique(),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', {
        withTimezone: true,
        mode: 'string',
    }), 
    agencyId: uuid('agencyId').notNull().references(()=>Agency.id, {onDelete: 'cascade'})
});

export const AddOns = pgTable('AddOns', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').notNull(),
    active: boolean('active').default(false),
    priceId: text('priceId').unique(),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', {
        withTimezone: true,
        mode: 'string',
    }), 
    agencyId: uuid('agencyId').notNull().references(()=>Agency.id, {onDelete: 'cascade'})
})