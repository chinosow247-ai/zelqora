-- Production database blueprint. The current demo can run without PostgreSQL;
-- migrate these entities to PostgreSQL before public launch.
CREATE TABLE users(id TEXT PRIMARY KEY,email TEXT UNIQUE NOT NULL,name TEXT NOT NULL,bio TEXT DEFAULT '',avatar TEXT DEFAULT '',password_hash TEXT NOT NULL,role TEXT DEFAULT 'user',verified BOOLEAN DEFAULT FALSE,created_at TIMESTAMPTZ DEFAULT now());
CREATE TABLE follows(follower_id TEXT REFERENCES users(id),following_id TEXT REFERENCES users(id),created_at TIMESTAMPTZ DEFAULT now(),PRIMARY KEY(follower_id,following_id));
CREATE TABLE videos(id TEXT PRIMARY KEY,user_id TEXT REFERENCES users(id),title TEXT NOT NULL,description TEXT DEFAULT '',media_url TEXT NOT NULL,thumbnail_url TEXT DEFAULT '',created_at TIMESTAMPTZ DEFAULT now(),views BIGINT DEFAULT 0);
CREATE TABLE video_likes(video_id TEXT REFERENCES videos(id),user_id TEXT REFERENCES users(id),created_at TIMESTAMPTZ DEFAULT now(),PRIMARY KEY(video_id,user_id));
CREATE TABLE video_saves(video_id TEXT REFERENCES videos(id),user_id TEXT REFERENCES users(id),created_at TIMESTAMPTZ DEFAULT now(),PRIMARY KEY(video_id,user_id));
CREATE TABLE comments(id TEXT PRIMARY KEY,video_id TEXT REFERENCES videos(id),user_id TEXT REFERENCES users(id),body TEXT NOT NULL,created_at TIMESTAMPTZ DEFAULT now());
CREATE TABLE messages(id TEXT PRIMARY KEY,sender_id TEXT REFERENCES users(id),recipient_id TEXT REFERENCES users(id),body TEXT NOT NULL,created_at TIMESTAMPTZ DEFAULT now());
CREATE TABLE reports(id TEXT PRIMARY KEY,reporter_id TEXT REFERENCES users(id),target_type TEXT NOT NULL,target_id TEXT NOT NULL,reason TEXT NOT NULL,status TEXT DEFAULT 'open',created_at TIMESTAMPTZ DEFAULT now());
CREATE TABLE blocks(blocker_id TEXT REFERENCES users(id),blocked_id TEXT REFERENCES users(id),created_at TIMESTAMPTZ DEFAULT now(),PRIMARY KEY(blocker_id,blocked_id));
CREATE TABLE notifications(id TEXT PRIMARY KEY,user_id TEXT REFERENCES users(id),type TEXT NOT NULL,body TEXT NOT NULL,read BOOLEAN DEFAULT FALSE,created_at TIMESTAMPTZ DEFAULT now());


-- Creator monetization / withdrawals (Paystack)
CREATE TABLE wallets(user_id TEXT PRIMARY KEY REFERENCES users(id),coins BIGINT DEFAULT 0,creator_earnings_coins BIGINT DEFAULT 0,premium BOOLEAN DEFAULT FALSE);
CREATE TABLE payout_accounts(user_id TEXT PRIMARY KEY REFERENCES users(id),recipient_code TEXT UNIQUE NOT NULL,bank_code TEXT NOT NULL,bank_name TEXT NOT NULL,account_name TEXT NOT NULL,account_number_last4 TEXT NOT NULL,created_at TIMESTAMPTZ DEFAULT now(),updated_at TIMESTAMPTZ DEFAULT now());
CREATE TABLE wallet_transactions(id TEXT PRIMARY KEY,user_id TEXT REFERENCES users(id),type TEXT NOT NULL,coins BIGINT DEFAULT 0,amount_ngn BIGINT DEFAULT 0,reference TEXT,created_at TIMESTAMPTZ DEFAULT now());
CREATE TABLE creator_payouts(id TEXT PRIMARY KEY,user_id TEXT REFERENCES users(id),reference TEXT UNIQUE NOT NULL,recipient_code TEXT NOT NULL,coins BIGINT NOT NULL,amount_ngn BIGINT NOT NULL,amount_kobo BIGINT NOT NULL,currency TEXT DEFAULT 'NGN',status TEXT NOT NULL,provider_id TEXT,transfer_code TEXT,failure_reason TEXT,created_at TIMESTAMPTZ DEFAULT now(),updated_at TIMESTAMPTZ DEFAULT now(),completed_at TIMESTAMPTZ,refunded_at TIMESTAMPTZ);
