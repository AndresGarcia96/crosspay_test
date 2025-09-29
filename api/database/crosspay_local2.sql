--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-09-29 05:21:25

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 48809)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 4956 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- TOC entry 873 (class 1247 OID 49285)
-- Name: transaction_currency_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.transaction_currency_type_enum AS ENUM (
    'COP',
    'USD'
);


ALTER TYPE public.transaction_currency_type_enum OWNER TO postgres;

--
-- TOC entry 876 (class 1247 OID 49290)
-- Name: transaction_paying_user_id_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.transaction_paying_user_id_type_enum AS ENUM (
    'CÉDULA DE CIUDADANÍA',
    'CÉDULA DE ENTRANJERÍA',
    'DOCUMENTO DE RESIDENCIA',
    'NIT',
    'DOCUMENTO NACIONAL DE IDENTIDAD',
    'PASAPORTE',
    'LICENCIA DE CONDUCCIÓN',
    'OTRO'
);


ALTER TYPE public.transaction_paying_user_id_type_enum OWNER TO postgres;

--
-- TOC entry 864 (class 1247 OID 49087)
-- Name: user_id_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_id_type_enum AS ENUM (
    'CÉDULA DE CIUDADANÍA',
    'CÉDULA DE ENTRANJERÍA',
    'DOCUMENTO DE RESIDENCIA',
    'NIT',
    'DOCUMENTO NACIONAL DE IDENTIDAD',
    'PASAPORTE',
    'LICENCIA DE CONDUCCIÓN',
    'OTRO'
);


ALTER TYPE public.user_id_type_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 49118)
-- Name: User_Roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User_Roles" (
    "userId" uuid NOT NULL,
    "roleId" integer NOT NULL
);


ALTER TABLE public."User_Roles" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 48821)
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    id integer NOT NULL,
    name character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp without time zone
);


ALTER TABLE public.role OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 48820)
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.role_id_seq OWNER TO postgres;

--
-- TOC entry 4957 (class 0 OID 0)
-- Dependencies: 218
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- TOC entry 222 (class 1259 OID 49307)
-- Name: transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    currency_type public.transaction_currency_type_enum NOT NULL,
    transfer_amount numeric(12,2) NOT NULL,
    description text NOT NULL,
    paying_username text NOT NULL,
    paying_user_id_type public.transaction_paying_user_id_type_enum NOT NULL,
    paying_user_id_number text NOT NULL,
    card_number text NOT NULL,
    card_expiration text NOT NULL,
    card_cvv text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp without time zone,
    "userId" uuid
);


ALTER TABLE public.transaction OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 49103)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text,
    last_name text,
    id_type public.user_id_type_enum NOT NULL,
    id_number text NOT NULL,
    birthdate date,
    email character varying,
    cellphone bigint,
    password character varying NOT NULL,
    verification_code integer,
    residence_department character varying,
    residence_city character varying,
    residence_address character varying,
    residence_neighborhood character varying,
    is_active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp without time zone
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 4774 (class 2604 OID 48824)
-- Name: role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- TOC entry 4949 (class 0 OID 49118)
-- Dependencies: 221
-- Data for Name: User_Roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User_Roles" ("userId", "roleId") FROM stdin;
e04ecff2-8bb4-4c64-9d13-120bba2fba0d	1
f1e092b3-4881-43a6-ba72-cb18f7a627a9	1
e04ecff2-8bb4-4c64-9d13-120bba2fba0d	3
f1e092b3-4881-43a6-ba72-cb18f7a627a9	3
\.


--
-- TOC entry 4947 (class 0 OID 48821)
-- Dependencies: 219
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role (id, name, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	SUPER ADMINISTRADOR	2025-09-28 14:30:20.217637	2025-09-28 14:30:20.217637	\N
2	ADMINISTRADOR	2025-09-28 14:30:28.306078	2025-09-28 14:30:28.306078	\N
3	USUARIO	2025-09-28 14:30:42.844351	2025-09-28 14:30:42.844351	\N
4	AUDITOR	2025-09-28 14:30:48.269949	2025-09-28 14:30:48.269949	\N
\.


--
-- TOC entry 4950 (class 0 OID 49307)
-- Dependencies: 222
-- Data for Name: transaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaction (id, currency_type, transfer_amount, description, paying_username, paying_user_id_type, paying_user_id_number, card_number, card_expiration, card_cvv, "createdAt", "updatedAt", "deletedAt", "userId") FROM stdin;
a1fb6e70-b2ad-4adb-8934-a6697a27b1f8	USD	1787.94	Pago de prueba #1	ANDY	CÉDULA DE CIUDADANÍA	123456789	4260474907326643	06/26	679	2025-08-31 00:25:23.534261	2025-08-31 00:25:23.534261	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
f0930bc1-862c-4cba-9d2c-af47f940a08f	USD	1781.26	Pago de prueba #2	ANDY	CÉDULA DE CIUDADANÍA	123456789	4946735800167500	09/28	695	2025-09-16 00:25:23.534261	2025-09-16 00:25:23.534261	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
981108fa-4942-4252-bf27-8ccdce2be40b	USD	907.87	Pago de prueba #3	ANDY	CÉDULA DE CIUDADANÍA	123456789	4897393442219646	04/29	761	2025-09-20 00:25:23.534261	2025-09-20 00:25:23.534261	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
68f16a64-a02c-4078-9bbf-1fbd1d67cee6	USD	81.53	Pago de prueba #4	ANDY	CÉDULA DE CIUDADANÍA	123456789	4729503996853945	05/27	612	2025-09-01 00:25:23.534261	2025-09-01 00:25:23.534261	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
8b056165-5f8a-4832-8c68-2e3459fbe8de	USD	1845.02	Pago de prueba #5	ANDY	CÉDULA DE CIUDADANÍA	123456789	4237551916947053	09/24	146	2025-09-21 00:25:23.534261	2025-09-21 00:25:23.534261	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
61c942bf-e4b8-441b-a2e2-3d4127c174ee	USD	740.35	Pago de prueba #6	ANDY	CÉDULA DE CIUDADANÍA	123456789	469612691658095	10/27	101	2025-09-25 00:25:23.534261	2025-09-25 00:25:23.534261	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
60589fad-d1d4-4dd9-9e20-16b6f1ab0a9c	USD	1668.87	Pago de prueba #7	ANDY	CÉDULA DE CIUDADANÍA	123456789	4217274860634127	03/25	802	2025-09-26 00:25:23.534261	2025-09-26 00:25:23.534261	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
b2c1f980-015f-4c9f-8edb-9b41ad1f7e2e	USD	518.14	Pago de prueba #8	ANDY	CÉDULA DE CIUDADANÍA	123456789	4111218220132711	07/24	104	2025-09-23 00:25:23.534261	2025-09-23 00:25:23.534261	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
0824784e-14e2-4e92-917b-356d9ceda073	USD	618.84	Pago de prueba #9	ANDY	CÉDULA DE CIUDADANÍA	123456789	4553733996162446	07/28	449	2025-09-22 00:25:23.534261	2025-09-22 00:25:23.534261	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
4db6710a-b314-48c0-a1fb-441faa60c99c	USD	1401.68	Pago de prueba #10	ANDY	CÉDULA DE CIUDADANÍA	123456789	4281085985326770	04/26	681	2025-09-02 00:25:23.534261	2025-09-02 00:25:23.534261	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
e0a133a5-67c0-4cf6-8654-6c78ace47e55	USD	1628.16	Pago de prueba #11	ANDY	CÉDULA DE CIUDADANÍA	123456789	425310371593052	02/26	601	2025-09-18 00:25:23.534261	2025-09-18 00:25:23.534261	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
fb3e8e47-763e-4f21-853f-7563dc312465	USD	1631.16	Pago de prueba #12	ANDY	CÉDULA DE CIUDADANÍA	123456789	4892151636355985	02/29	091	2025-09-11 00:25:23.534261	2025-09-11 00:25:23.534261	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
93c4faaf-e564-46a9-9196-cab0f586f091	USD	1997.60	Pago de prueba #13	ANDY	CÉDULA DE CIUDADANÍA	123456789	42427077882547	03/26	821	2025-09-25 00:25:23.534261	2025-09-25 00:25:23.534261	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
61f8d93b-a65a-4e0d-8c45-53a4cc18553c	USD	1958.07	Pago de prueba #14	ANDY	CÉDULA DE CIUDADANÍA	123456789	4335920987887751	02/26	816	2025-08-31 00:25:23.534261	2025-08-31 00:25:23.534261	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
42ddc249-72a5-4b0d-b942-7ed9f3be4dca	USD	1601.65	Pago de prueba #15	ANDY	CÉDULA DE CIUDADANÍA	123456789	4137312565047239	01/29	397	2025-09-01 00:25:23.534261	2025-09-01 00:25:23.534261	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
9a85252b-9e44-4ace-9dc1-4f1163f8b86c	USD	514.30	Pago de prueba #16	ANDY	CÉDULA DE CIUDADANÍA	123456789	4221364779429095	02/24	966	2025-09-12 00:25:23.534261	2025-09-12 00:25:23.534261	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
a5338d58-31b1-4ccb-ae07-87bb93b5d00d	USD	727.03	Pago de prueba #17	ANDY	CÉDULA DE CIUDADANÍA	123456789	4149406709011681	07/24	096	2025-09-16 00:25:23.534261	2025-09-16 00:25:23.534261	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
d50207e4-1d27-47a2-a800-a98619021e36	USD	567.10	Pago de prueba #18	ANDY	CÉDULA DE CIUDADANÍA	123456789	4527779415632935	01/28	520	2025-09-18 00:25:23.534261	2025-09-18 00:25:23.534261	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
8e5932e2-b24f-4ca5-9bcf-e8e493df4d3b	USD	266.30	Pago de prueba #19	ANDY	CÉDULA DE CIUDADANÍA	123456789	4509713149894191	03/25	651	2025-09-15 00:25:23.534261	2025-09-15 00:25:23.534261	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
4626f343-de64-4e18-86e1-e22282dc8b79	USD	1916.71	Pago de prueba #20	ANDY	CÉDULA DE CIUDADANÍA	123456789	4356195984171809	04/28	937	2025-09-16 00:25:23.534261	2025-09-16 00:25:23.534261	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
627bfc3f-cab0-48c2-abeb-0cd2f1348645	USD	825.67	Pago de prueba #21	ANDY	CÉDULA DE CIUDADANÍA	123456789	4617215498583824	10/24	335	2025-09-27 00:25:23.534261	2025-09-27 00:25:23.534261	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
5e7da28e-dca2-4b5f-a3dc-6f7e36fbca4e	USD	1616.49	Pago de prueba #22	ANDY	CÉDULA DE CIUDADANÍA	123456789	4869205662819255	10/29	667	2025-09-28 00:25:23.534261	2025-09-28 00:25:23.534261	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
4625d2d5-6df4-4bce-a10d-e16b240791fc	USD	777.04	Pago de prueba #23	ANDY	CÉDULA DE CIUDADANÍA	123456789	4934838062384189	06/25	931	2025-09-20 00:25:23.534261	2025-09-20 00:25:23.534261	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
c89ee64f-b294-49d8-b4ec-3e63fe243a2f	USD	102.82	Pago de prueba #24	ANDY	CÉDULA DE CIUDADANÍA	123456789	4534056947822977	02/24	018	2025-09-06 00:25:23.534261	2025-09-06 00:25:23.534261	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
2109e894-1f27-423f-9bd6-5a8b12e3ee95	USD	970.01	Pago de prueba #25	ANDY	CÉDULA DE CIUDADANÍA	123456789	4991363873127727	06/25	694	2025-09-09 00:25:23.534261	2025-09-09 00:25:23.534261	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
f94393f7-8eb0-40e8-be6b-5e6c1f01d7a0	USD	1299.58	Pago de prueba #26	ANDY	CÉDULA DE CIUDADANÍA	123456789	4358562458968691	07/27	480	2025-09-19 00:25:23.534261	2025-09-19 00:25:23.534261	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
48d39ee6-2acb-4782-a5e7-477c7558a418	USD	1283.54	Pago de prueba #27	ANDY	CÉDULA DE CIUDADANÍA	123456789	4486279345366240	12/29	795	2025-08-31 00:25:23.534261	2025-08-31 00:25:23.534261	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
58b2f016-6464-4a60-a853-12006244f5b5	USD	1633.54	Pago de prueba #28	ANDY	CÉDULA DE CIUDADANÍA	123456789	4776876161429277	04/27	046	2025-09-24 00:25:23.534261	2025-09-24 00:25:23.534261	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
a09355fa-eccc-4c4e-a3e5-c85f8aa8bf8d	USD	372.40	Pago de prueba #29	ANDY	CÉDULA DE CIUDADANÍA	123456789	4335359520776361	12/29	706	2025-09-20 00:25:23.534261	2025-09-20 00:25:23.534261	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
d7249eee-ac18-41a4-8ba4-2055a146f6b7	USD	1625.15	Pago de prueba #30	ANDY	CÉDULA DE CIUDADANÍA	123456789	4836420906777955	04/28	981	2025-09-25 00:25:23.534261	2025-09-25 00:25:23.534261	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
9d377329-d321-44e1-9d63-257759c35c39	COP	705.61	Pago de prueba #30	ANDY	CÉDULA DE CIUDADANÍA	123456789	485462739158360	07/28	491	2025-09-12 00:26:13.969109	2025-09-12 00:26:13.969109	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
eb409195-4026-4498-bb56-16e466743286	COP	1467.91	Pago de prueba #31	ANDY	CÉDULA DE CIUDADANÍA	123456789	4767859884077992	10/24	159	2025-09-06 00:26:13.969109	2025-09-06 00:26:13.969109	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
82cd01ae-1d0d-4179-88fd-e0f0a9846c00	COP	1883.23	Pago de prueba #32	ANDY	CÉDULA DE CIUDADANÍA	123456789	4508068640172773	11/28	651	2025-09-01 00:26:13.969109	2025-09-01 00:26:13.969109	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
01c43853-b5c2-43d0-8817-6ae20cbbe3a2	COP	115.71	Pago de prueba #33	ANDY	CÉDULA DE CIUDADANÍA	123456789	4270524140812569	01/28	842	2025-09-21 00:26:13.969109	2025-09-21 00:26:13.969109	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
cef7862b-e368-4ace-802b-e13c220f1412	COP	1910.26	Pago de prueba #34	ANDY	CÉDULA DE CIUDADANÍA	123456789	4370720903187768	05/24	246	2025-09-05 00:26:13.969109	2025-09-05 00:26:13.969109	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
39195779-156e-4f8a-afd8-766c31d0e3ba	COP	1443.03	Pago de prueba #35	ANDY	CÉDULA DE CIUDADANÍA	123456789	4488882048853896	10/24	110	2025-09-26 00:26:13.969109	2025-09-26 00:26:13.969109	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
2917ed5f-1dee-40e4-b043-40be12ed425d	COP	1547.46	Pago de prueba #36	ANDY	CÉDULA DE CIUDADANÍA	123456789	4812281878225740	05/29	525	2025-09-17 00:26:13.969109	2025-09-17 00:26:13.969109	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
296f37aa-ffc8-4fc8-8721-f59448fa98fc	COP	1221.52	Pago de prueba #37	ANDY	CÉDULA DE CIUDADANÍA	123456789	4521461388156217	07/24	839	2025-09-01 00:26:13.969109	2025-09-01 00:26:13.969109	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
dc565d09-0882-4ebe-82c0-e16cec9e4614	COP	902.15	Pago de prueba #38	ANDY	CÉDULA DE CIUDADANÍA	123456789	4597929128227722	09/25	438	2025-09-19 00:26:13.969109	2025-09-19 00:26:13.969109	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
2a2717d0-3eb8-4fc1-bd9b-ad5380e9e5c3	COP	513.88	Pago de prueba #39	ANDY	CÉDULA DE CIUDADANÍA	123456789	4380363977561761	11/24	630	2025-09-12 00:26:13.969109	2025-09-12 00:26:13.969109	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
740daf27-14f0-4dbb-a592-1ddcf651e69f	COP	1303.03	Pago de prueba #40	ANDY	CÉDULA DE CIUDADANÍA	123456789	4421118188477652	05/28	630	2025-09-04 00:26:13.969109	2025-09-04 00:26:13.969109	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
70a0027d-434b-435a-8342-a5edb1111449	COP	1303.35	Pago de prueba #41	ANDY	CÉDULA DE CIUDADANÍA	123456789	4555339044657683	07/26	690	2025-09-27 00:26:13.969109	2025-09-27 00:26:13.969109	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
c8813a27-6086-40c3-b313-00db33e9dcd6	COP	136.70	Pago de prueba #42	ANDY	CÉDULA DE CIUDADANÍA	123456789	4543984543495329	02/29	503	2025-09-17 00:26:13.969109	2025-09-17 00:26:13.969109	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
75bf01c1-6e41-4587-afc2-ce64d0eb2361	COP	676.71	Pago de prueba #43	ANDY	CÉDULA DE CIUDADANÍA	123456789	4911896967263552	11/27	847	2025-09-04 00:26:13.969109	2025-09-04 00:26:13.969109	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
14534dda-57b1-45da-b00e-8cc4c920c778	COP	466.52	Pago de prueba #44	ANDY	CÉDULA DE CIUDADANÍA	123456789	460739318389018	07/26	552	2025-09-07 00:26:13.969109	2025-09-07 00:26:13.969109	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
af75b022-4a81-4b61-ad28-5886c99b09e3	COP	1072.01	Pago de prueba #45	ANDY	CÉDULA DE CIUDADANÍA	123456789	443447411474519	10/24	835	2025-09-05 00:26:13.969109	2025-09-05 00:26:13.969109	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
9bd74f4d-851b-4120-a8ab-0cdd45367376	COP	1459.70	Pago de prueba #46	ANDY	CÉDULA DE CIUDADANÍA	123456789	4953225139669089	05/27	095	2025-09-16 00:26:13.969109	2025-09-16 00:26:13.969109	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
f58a6d27-24db-4245-b7e4-9043cbb59ce3	COP	406.36	Pago de prueba #47	ANDY	CÉDULA DE CIUDADANÍA	123456789	4322422300575686	03/26	104	2025-09-17 00:26:13.969109	2025-09-17 00:26:13.969109	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
ac91e445-3e62-4444-8b80-b8386b891360	COP	1572.41	Pago de prueba #48	ANDY	CÉDULA DE CIUDADANÍA	123456789	4423637065352137	05/25	677	2025-09-01 00:26:13.969109	2025-09-01 00:26:13.969109	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
d58f7b86-1a19-49ff-8e16-7cbbcb537e77	COP	1229.91	Pago de prueba #49	ANDY	CÉDULA DE CIUDADANÍA	123456789	4134465910951289	08/26	839	2025-09-10 00:26:13.969109	2025-09-10 00:26:13.969109	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
5846a45f-2aae-48d8-b22b-a5281f65cadf	COP	999.73	Pago de prueba #50	ANDY	CÉDULA DE CIUDADANÍA	123456789	4791820924811055	02/27	570	2025-09-27 00:26:13.969109	2025-09-27 00:26:13.969109	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
d9f58b9f-5255-4362-bd86-a83ac316ac12	COP	800000.00	Prueba en el front	ANDRES FELIPE GARCIA CASTRO	CÉDULA DE CIUDADANÍA	1140885249	1234567890	07/25	1234	2025-09-29 02:23:17.244014	2025-09-29 02:23:17.244014	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
7d73cc11-8208-4ffa-b615-6762edeee5b9	COP	2700000.00	Prueba enviando datos	BETSY LILIANA 	CÉDULA DE CIUDADANÍA	1125042820	32100548520	02/27	1234	2025-09-29 02:28:36.470048	2025-09-29 02:28:36.470048	\N	e04ecff2-8bb4-4c64-9d13-120bba2fba0d
\.


--
-- TOC entry 4948 (class 0 OID 49103)
-- Dependencies: 220
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, name, last_name, id_type, id_number, birthdate, email, cellphone, password, verification_code, residence_department, residence_city, residence_address, residence_neighborhood, is_active, "createdAt", "updatedAt", "deletedAt") FROM stdin;
f1e092b3-4881-43a6-ba72-cb18f7a627a9	CROSSPAY	SOLUTIONS	NIT	900648294	1990-09-09	tecnologia@crosspaysolutions.com	3012456789	$2a$10$6udthBk1dphW2Ms4HHMM1OJsgvTm9b1iOYGE8j7mz6fDXfku2vleu	\N	BOGOTÁ	BOGOTÁ	CL 93 B # 18 - 12 OF 401 B	\N	t	2025-09-28 18:35:53.556621	2025-09-28 18:35:53.556621	\N
e04ecff2-8bb4-4c64-9d13-120bba2fba0d	ANDY	OPINA	CÉDULA DE CIUDADANÍA	123456789	1996-06-06	andyopina96@gmail.com	3012456789	$2a$10$NMwkBuzqFdwJNNVcz1efy.chhyGugtqHkkrDKYkPQ1e08pXY6q9Ai	\N	\N	\N	\N	\N	t	2025-09-28 18:30:59.793142	2025-09-29 04:42:07.305848	\N
\.


--
-- TOC entry 4958 (class 0 OID 0)
-- Dependencies: 218
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_id_seq', 4, true);


--
-- TOC entry 4795 (class 2606 OID 49122)
-- Name: User_Roles PK_02ac9aa7bbf426d19990136af36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User_Roles"
    ADD CONSTRAINT "PK_02ac9aa7bbf426d19990136af36" PRIMARY KEY ("userId", "roleId");


--
-- TOC entry 4797 (class 2606 OID 49316)
-- Name: transaction PK_89eadb93a89810556e1cbcd6ab9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY (id);


--
-- TOC entry 4785 (class 2606 OID 48830)
-- Name: role PK_b36bcfe02fc8de3c57a8b2391c2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY (id);


--
-- TOC entry 4787 (class 2606 OID 49113)
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- TOC entry 4789 (class 2606 OID 49115)
-- Name: user UQ_ceff942006e320f626107bad7ea; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_ceff942006e320f626107bad7ea" UNIQUE (id_number);


--
-- TOC entry 4791 (class 2606 OID 49117)
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- TOC entry 4792 (class 1259 OID 49124)
-- Name: IDX_5cce46a25b807d2369d37ee4d3; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_5cce46a25b807d2369d37ee4d3" ON public."User_Roles" USING btree ("roleId");


--
-- TOC entry 4793 (class 1259 OID 49123)
-- Name: IDX_8c29a6612875cfef379f58afb9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_8c29a6612875cfef379f58afb9" ON public."User_Roles" USING btree ("userId");


--
-- TOC entry 4798 (class 2606 OID 49130)
-- Name: User_Roles FK_5cce46a25b807d2369d37ee4d33; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User_Roles"
    ADD CONSTRAINT "FK_5cce46a25b807d2369d37ee4d33" FOREIGN KEY ("roleId") REFERENCES public.role(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4800 (class 2606 OID 49317)
-- Name: transaction FK_605baeb040ff0fae995404cea37; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT "FK_605baeb040ff0fae995404cea37" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- TOC entry 4799 (class 2606 OID 49125)
-- Name: User_Roles FK_8c29a6612875cfef379f58afb9c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User_Roles"
    ADD CONSTRAINT "FK_8c29a6612875cfef379f58afb9c" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2025-09-29 05:21:25

--
-- PostgreSQL database dump complete
--

