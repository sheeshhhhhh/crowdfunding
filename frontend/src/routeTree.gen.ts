/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as SignupIndexImport } from './routes/signup/index'
import { Route as SettingsIndexImport } from './routes/settings/index'
import { Route as RedirecttokenIndexImport } from './routes/redirecttoken/index'
import { Route as MessagesIndexImport } from './routes/messages/index'
import { Route as LoginIndexImport } from './routes/login/index'
import { Route as DashboardIndexImport } from './routes/dashboard/index'
import { Route as ProfileUserIdImport } from './routes/profile/$userId'
import { Route as DonationSendMessageImport } from './routes/donation/sendMessage'
import { Route as DonationCheckImport } from './routes/donation/check'
import { Route as DashboardOverviewImport } from './routes/dashboard/Overview'
import { Route as DashboardInboxImport } from './routes/dashboard/Inbox'
import { Route as DashboardDonationsImport } from './routes/dashboard/Donations'
import { Route as DashboardCampaignsImport } from './routes/dashboard/Campaigns'
import { Route as CampaignsCreateImport } from './routes/campaigns/create'
import { Route as CampaignsBrowseImport } from './routes/campaigns/browse'
import { Route as CampaignsCampaignIdImport } from './routes/campaigns/$campaignId'
import { Route as DonationDonateDonationIdImport } from './routes/donation/donate/$donationId'
import { Route as CampaignsUpdateCampaignIdImport } from './routes/campaigns/update/$campaignId'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const SignupIndexRoute = SignupIndexImport.update({
  id: '/signup/',
  path: '/signup/',
  getParentRoute: () => rootRoute,
} as any)

const SettingsIndexRoute = SettingsIndexImport.update({
  id: '/settings/',
  path: '/settings/',
  getParentRoute: () => rootRoute,
} as any)

const RedirecttokenIndexRoute = RedirecttokenIndexImport.update({
  id: '/redirecttoken/',
  path: '/redirecttoken/',
  getParentRoute: () => rootRoute,
} as any)

const MessagesIndexRoute = MessagesIndexImport.update({
  id: '/messages/',
  path: '/messages/',
  getParentRoute: () => rootRoute,
} as any)

const LoginIndexRoute = LoginIndexImport.update({
  id: '/login/',
  path: '/login/',
  getParentRoute: () => rootRoute,
} as any)

const DashboardIndexRoute = DashboardIndexImport.update({
  id: '/dashboard/',
  path: '/dashboard/',
  getParentRoute: () => rootRoute,
} as any)

const ProfileUserIdRoute = ProfileUserIdImport.update({
  id: '/profile/$userId',
  path: '/profile/$userId',
  getParentRoute: () => rootRoute,
} as any)

const DonationSendMessageRoute = DonationSendMessageImport.update({
  id: '/donation/sendMessage',
  path: '/donation/sendMessage',
  getParentRoute: () => rootRoute,
} as any)

const DonationCheckRoute = DonationCheckImport.update({
  id: '/donation/check',
  path: '/donation/check',
  getParentRoute: () => rootRoute,
} as any)

const DashboardOverviewRoute = DashboardOverviewImport.update({
  id: '/dashboard/Overview',
  path: '/dashboard/Overview',
  getParentRoute: () => rootRoute,
} as any)

const DashboardInboxRoute = DashboardInboxImport.update({
  id: '/dashboard/Inbox',
  path: '/dashboard/Inbox',
  getParentRoute: () => rootRoute,
} as any)

const DashboardDonationsRoute = DashboardDonationsImport.update({
  id: '/dashboard/Donations',
  path: '/dashboard/Donations',
  getParentRoute: () => rootRoute,
} as any)

const DashboardCampaignsRoute = DashboardCampaignsImport.update({
  id: '/dashboard/Campaigns',
  path: '/dashboard/Campaigns',
  getParentRoute: () => rootRoute,
} as any)

const CampaignsCreateRoute = CampaignsCreateImport.update({
  id: '/campaigns/create',
  path: '/campaigns/create',
  getParentRoute: () => rootRoute,
} as any)

const CampaignsBrowseRoute = CampaignsBrowseImport.update({
  id: '/campaigns/browse',
  path: '/campaigns/browse',
  getParentRoute: () => rootRoute,
} as any)

const CampaignsCampaignIdRoute = CampaignsCampaignIdImport.update({
  id: '/campaigns/$campaignId',
  path: '/campaigns/$campaignId',
  getParentRoute: () => rootRoute,
} as any)

const DonationDonateDonationIdRoute = DonationDonateDonationIdImport.update({
  id: '/donation/donate/$donationId',
  path: '/donation/donate/$donationId',
  getParentRoute: () => rootRoute,
} as any)

const CampaignsUpdateCampaignIdRoute = CampaignsUpdateCampaignIdImport.update({
  id: '/campaigns/update/$campaignId',
  path: '/campaigns/update/$campaignId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/campaigns/$campaignId': {
      id: '/campaigns/$campaignId'
      path: '/campaigns/$campaignId'
      fullPath: '/campaigns/$campaignId'
      preLoaderRoute: typeof CampaignsCampaignIdImport
      parentRoute: typeof rootRoute
    }
    '/campaigns/browse': {
      id: '/campaigns/browse'
      path: '/campaigns/browse'
      fullPath: '/campaigns/browse'
      preLoaderRoute: typeof CampaignsBrowseImport
      parentRoute: typeof rootRoute
    }
    '/campaigns/create': {
      id: '/campaigns/create'
      path: '/campaigns/create'
      fullPath: '/campaigns/create'
      preLoaderRoute: typeof CampaignsCreateImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/Campaigns': {
      id: '/dashboard/Campaigns'
      path: '/dashboard/Campaigns'
      fullPath: '/dashboard/Campaigns'
      preLoaderRoute: typeof DashboardCampaignsImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/Donations': {
      id: '/dashboard/Donations'
      path: '/dashboard/Donations'
      fullPath: '/dashboard/Donations'
      preLoaderRoute: typeof DashboardDonationsImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/Inbox': {
      id: '/dashboard/Inbox'
      path: '/dashboard/Inbox'
      fullPath: '/dashboard/Inbox'
      preLoaderRoute: typeof DashboardInboxImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/Overview': {
      id: '/dashboard/Overview'
      path: '/dashboard/Overview'
      fullPath: '/dashboard/Overview'
      preLoaderRoute: typeof DashboardOverviewImport
      parentRoute: typeof rootRoute
    }
    '/donation/check': {
      id: '/donation/check'
      path: '/donation/check'
      fullPath: '/donation/check'
      preLoaderRoute: typeof DonationCheckImport
      parentRoute: typeof rootRoute
    }
    '/donation/sendMessage': {
      id: '/donation/sendMessage'
      path: '/donation/sendMessage'
      fullPath: '/donation/sendMessage'
      preLoaderRoute: typeof DonationSendMessageImport
      parentRoute: typeof rootRoute
    }
    '/profile/$userId': {
      id: '/profile/$userId'
      path: '/profile/$userId'
      fullPath: '/profile/$userId'
      preLoaderRoute: typeof ProfileUserIdImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/': {
      id: '/dashboard/'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardIndexImport
      parentRoute: typeof rootRoute
    }
    '/login/': {
      id: '/login/'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginIndexImport
      parentRoute: typeof rootRoute
    }
    '/messages/': {
      id: '/messages/'
      path: '/messages'
      fullPath: '/messages'
      preLoaderRoute: typeof MessagesIndexImport
      parentRoute: typeof rootRoute
    }
    '/redirecttoken/': {
      id: '/redirecttoken/'
      path: '/redirecttoken'
      fullPath: '/redirecttoken'
      preLoaderRoute: typeof RedirecttokenIndexImport
      parentRoute: typeof rootRoute
    }
    '/settings/': {
      id: '/settings/'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof SettingsIndexImport
      parentRoute: typeof rootRoute
    }
    '/signup/': {
      id: '/signup/'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupIndexImport
      parentRoute: typeof rootRoute
    }
    '/campaigns/update/$campaignId': {
      id: '/campaigns/update/$campaignId'
      path: '/campaigns/update/$campaignId'
      fullPath: '/campaigns/update/$campaignId'
      preLoaderRoute: typeof CampaignsUpdateCampaignIdImport
      parentRoute: typeof rootRoute
    }
    '/donation/donate/$donationId': {
      id: '/donation/donate/$donationId'
      path: '/donation/donate/$donationId'
      fullPath: '/donation/donate/$donationId'
      preLoaderRoute: typeof DonationDonateDonationIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/campaigns/$campaignId': typeof CampaignsCampaignIdRoute
  '/campaigns/browse': typeof CampaignsBrowseRoute
  '/campaigns/create': typeof CampaignsCreateRoute
  '/dashboard/Campaigns': typeof DashboardCampaignsRoute
  '/dashboard/Donations': typeof DashboardDonationsRoute
  '/dashboard/Inbox': typeof DashboardInboxRoute
  '/dashboard/Overview': typeof DashboardOverviewRoute
  '/donation/check': typeof DonationCheckRoute
  '/donation/sendMessage': typeof DonationSendMessageRoute
  '/profile/$userId': typeof ProfileUserIdRoute
  '/dashboard': typeof DashboardIndexRoute
  '/login': typeof LoginIndexRoute
  '/messages': typeof MessagesIndexRoute
  '/redirecttoken': typeof RedirecttokenIndexRoute
  '/settings': typeof SettingsIndexRoute
  '/signup': typeof SignupIndexRoute
  '/campaigns/update/$campaignId': typeof CampaignsUpdateCampaignIdRoute
  '/donation/donate/$donationId': typeof DonationDonateDonationIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/campaigns/$campaignId': typeof CampaignsCampaignIdRoute
  '/campaigns/browse': typeof CampaignsBrowseRoute
  '/campaigns/create': typeof CampaignsCreateRoute
  '/dashboard/Campaigns': typeof DashboardCampaignsRoute
  '/dashboard/Donations': typeof DashboardDonationsRoute
  '/dashboard/Inbox': typeof DashboardInboxRoute
  '/dashboard/Overview': typeof DashboardOverviewRoute
  '/donation/check': typeof DonationCheckRoute
  '/donation/sendMessage': typeof DonationSendMessageRoute
  '/profile/$userId': typeof ProfileUserIdRoute
  '/dashboard': typeof DashboardIndexRoute
  '/login': typeof LoginIndexRoute
  '/messages': typeof MessagesIndexRoute
  '/redirecttoken': typeof RedirecttokenIndexRoute
  '/settings': typeof SettingsIndexRoute
  '/signup': typeof SignupIndexRoute
  '/campaigns/update/$campaignId': typeof CampaignsUpdateCampaignIdRoute
  '/donation/donate/$donationId': typeof DonationDonateDonationIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/campaigns/$campaignId': typeof CampaignsCampaignIdRoute
  '/campaigns/browse': typeof CampaignsBrowseRoute
  '/campaigns/create': typeof CampaignsCreateRoute
  '/dashboard/Campaigns': typeof DashboardCampaignsRoute
  '/dashboard/Donations': typeof DashboardDonationsRoute
  '/dashboard/Inbox': typeof DashboardInboxRoute
  '/dashboard/Overview': typeof DashboardOverviewRoute
  '/donation/check': typeof DonationCheckRoute
  '/donation/sendMessage': typeof DonationSendMessageRoute
  '/profile/$userId': typeof ProfileUserIdRoute
  '/dashboard/': typeof DashboardIndexRoute
  '/login/': typeof LoginIndexRoute
  '/messages/': typeof MessagesIndexRoute
  '/redirecttoken/': typeof RedirecttokenIndexRoute
  '/settings/': typeof SettingsIndexRoute
  '/signup/': typeof SignupIndexRoute
  '/campaigns/update/$campaignId': typeof CampaignsUpdateCampaignIdRoute
  '/donation/donate/$donationId': typeof DonationDonateDonationIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/campaigns/$campaignId'
    | '/campaigns/browse'
    | '/campaigns/create'
    | '/dashboard/Campaigns'
    | '/dashboard/Donations'
    | '/dashboard/Inbox'
    | '/dashboard/Overview'
    | '/donation/check'
    | '/donation/sendMessage'
    | '/profile/$userId'
    | '/dashboard'
    | '/login'
    | '/messages'
    | '/redirecttoken'
    | '/settings'
    | '/signup'
    | '/campaigns/update/$campaignId'
    | '/donation/donate/$donationId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/campaigns/$campaignId'
    | '/campaigns/browse'
    | '/campaigns/create'
    | '/dashboard/Campaigns'
    | '/dashboard/Donations'
    | '/dashboard/Inbox'
    | '/dashboard/Overview'
    | '/donation/check'
    | '/donation/sendMessage'
    | '/profile/$userId'
    | '/dashboard'
    | '/login'
    | '/messages'
    | '/redirecttoken'
    | '/settings'
    | '/signup'
    | '/campaigns/update/$campaignId'
    | '/donation/donate/$donationId'
  id:
    | '__root__'
    | '/'
    | '/campaigns/$campaignId'
    | '/campaigns/browse'
    | '/campaigns/create'
    | '/dashboard/Campaigns'
    | '/dashboard/Donations'
    | '/dashboard/Inbox'
    | '/dashboard/Overview'
    | '/donation/check'
    | '/donation/sendMessage'
    | '/profile/$userId'
    | '/dashboard/'
    | '/login/'
    | '/messages/'
    | '/redirecttoken/'
    | '/settings/'
    | '/signup/'
    | '/campaigns/update/$campaignId'
    | '/donation/donate/$donationId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CampaignsCampaignIdRoute: typeof CampaignsCampaignIdRoute
  CampaignsBrowseRoute: typeof CampaignsBrowseRoute
  CampaignsCreateRoute: typeof CampaignsCreateRoute
  DashboardCampaignsRoute: typeof DashboardCampaignsRoute
  DashboardDonationsRoute: typeof DashboardDonationsRoute
  DashboardInboxRoute: typeof DashboardInboxRoute
  DashboardOverviewRoute: typeof DashboardOverviewRoute
  DonationCheckRoute: typeof DonationCheckRoute
  DonationSendMessageRoute: typeof DonationSendMessageRoute
  ProfileUserIdRoute: typeof ProfileUserIdRoute
  DashboardIndexRoute: typeof DashboardIndexRoute
  LoginIndexRoute: typeof LoginIndexRoute
  MessagesIndexRoute: typeof MessagesIndexRoute
  RedirecttokenIndexRoute: typeof RedirecttokenIndexRoute
  SettingsIndexRoute: typeof SettingsIndexRoute
  SignupIndexRoute: typeof SignupIndexRoute
  CampaignsUpdateCampaignIdRoute: typeof CampaignsUpdateCampaignIdRoute
  DonationDonateDonationIdRoute: typeof DonationDonateDonationIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CampaignsCampaignIdRoute: CampaignsCampaignIdRoute,
  CampaignsBrowseRoute: CampaignsBrowseRoute,
  CampaignsCreateRoute: CampaignsCreateRoute,
  DashboardCampaignsRoute: DashboardCampaignsRoute,
  DashboardDonationsRoute: DashboardDonationsRoute,
  DashboardInboxRoute: DashboardInboxRoute,
  DashboardOverviewRoute: DashboardOverviewRoute,
  DonationCheckRoute: DonationCheckRoute,
  DonationSendMessageRoute: DonationSendMessageRoute,
  ProfileUserIdRoute: ProfileUserIdRoute,
  DashboardIndexRoute: DashboardIndexRoute,
  LoginIndexRoute: LoginIndexRoute,
  MessagesIndexRoute: MessagesIndexRoute,
  RedirecttokenIndexRoute: RedirecttokenIndexRoute,
  SettingsIndexRoute: SettingsIndexRoute,
  SignupIndexRoute: SignupIndexRoute,
  CampaignsUpdateCampaignIdRoute: CampaignsUpdateCampaignIdRoute,
  DonationDonateDonationIdRoute: DonationDonateDonationIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/campaigns/$campaignId",
        "/campaigns/browse",
        "/campaigns/create",
        "/dashboard/Campaigns",
        "/dashboard/Donations",
        "/dashboard/Inbox",
        "/dashboard/Overview",
        "/donation/check",
        "/donation/sendMessage",
        "/profile/$userId",
        "/dashboard/",
        "/login/",
        "/messages/",
        "/redirecttoken/",
        "/settings/",
        "/signup/",
        "/campaigns/update/$campaignId",
        "/donation/donate/$donationId"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/campaigns/$campaignId": {
      "filePath": "campaigns/$campaignId.tsx"
    },
    "/campaigns/browse": {
      "filePath": "campaigns/browse.tsx"
    },
    "/campaigns/create": {
      "filePath": "campaigns/create.tsx"
    },
    "/dashboard/Campaigns": {
      "filePath": "dashboard/Campaigns.tsx"
    },
    "/dashboard/Donations": {
      "filePath": "dashboard/Donations.tsx"
    },
    "/dashboard/Inbox": {
      "filePath": "dashboard/Inbox.tsx"
    },
    "/dashboard/Overview": {
      "filePath": "dashboard/Overview.tsx"
    },
    "/donation/check": {
      "filePath": "donation/check.tsx"
    },
    "/donation/sendMessage": {
      "filePath": "donation/sendMessage.tsx"
    },
    "/profile/$userId": {
      "filePath": "profile/$userId.tsx"
    },
    "/dashboard/": {
      "filePath": "dashboard/index.tsx"
    },
    "/login/": {
      "filePath": "login/index.tsx"
    },
    "/messages/": {
      "filePath": "messages/index.tsx"
    },
    "/redirecttoken/": {
      "filePath": "redirecttoken/index.tsx"
    },
    "/settings/": {
      "filePath": "settings/index.tsx"
    },
    "/signup/": {
      "filePath": "signup/index.tsx"
    },
    "/campaigns/update/$campaignId": {
      "filePath": "campaigns/update/$campaignId.tsx"
    },
    "/donation/donate/$donationId": {
      "filePath": "donation/donate/$donationId.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
