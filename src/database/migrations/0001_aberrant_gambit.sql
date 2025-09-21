CREATE TABLE "location_manager_assignments" (
	"user_id" integer NOT NULL,
	"location_id" integer NOT NULL,
	CONSTRAINT "location_manager_assignments_user_id_location_id_pk" PRIMARY KEY("user_id","location_id")
);
--> statement-breakpoint
CREATE TABLE "locations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"address" text,
	"floor_count" integer DEFAULT 1,
	"organization_id" integer NOT NULL,
	CONSTRAINT "locations_name_unique" UNIQUE("name"),
	CONSTRAINT "locations_address_unique" UNIQUE("address")
);
--> statement-breakpoint
ALTER TABLE "location_manager_assignments" ADD CONSTRAINT "location_manager_assignments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "location_manager_assignments" ADD CONSTRAINT "location_manager_assignments_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "locations" ADD CONSTRAINT "locations_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;