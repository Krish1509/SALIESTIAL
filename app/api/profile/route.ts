import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getDatabase } from '@/lib/mongodb';

// GET - Fetch user profile
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const db = await getDatabase();
    const profiles = db.collection('profiles');
    
    const profile = await profiles.findOne({ email: session.user.email });
    
    if (!profile) {
      return NextResponse.json({ profile: null });
    }

    // Remove _id from response
    const { _id, ...profileData } = profile;
    return NextResponse.json({ profile: profileData });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

// POST - Create or update user profile
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { phone, college, year, department, city, state, bio } = body;

    const db = await getDatabase();
    const profiles = db.collection('profiles');

    const updateData: any = {
      email: session.user.email,
      name: session.user.name || '',
      image: session.user.image || '',
      phone: phone || '',
      college: college || '',
      year: year || '',
      department: department || '',
      city: city || '',
      state: state || '',
      bio: bio || '',
      updatedAt: new Date(),
    };

    // Upsert profile (create if doesn't exist, update if exists)
    const result = await profiles.updateOne(
      { email: session.user.email },
      { 
        $set: updateData,
        $setOnInsert: { createdAt: new Date() }
      },
      { upsert: true }
    );

    // Fetch the updated/created profile
    const savedProfile = await profiles.findOne({ email: session.user.email });
    const { _id, ...profileData } = savedProfile!;

    return NextResponse.json({ 
      success: true, 
      message: 'Profile saved successfully',
      profile: profileData
    });
  } catch (error) {
    console.error('Error saving profile:', error);
    return NextResponse.json(
      { error: 'Failed to save profile' },
      { status: 500 }
    );
  }
}

// PUT - Update user profile
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { phone, college, year, department, city, state, bio } = body;

    const db = await getDatabase();
    const profiles = db.collection('profiles');

    const updateData: any = {
      updatedAt: new Date(),
    };

    if (phone !== undefined) updateData.phone = phone;
    if (college !== undefined) updateData.college = college;
    if (year !== undefined) updateData.year = year;
    if (department !== undefined) updateData.department = department;
    if (city !== undefined) updateData.city = city;
    if (state !== undefined) updateData.state = state;
    if (bio !== undefined) updateData.bio = bio;

    const result = await profiles.updateOne(
      { email: session.user.email },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    const updatedProfile = await profiles.findOne({ email: session.user.email });
    const { _id, ...profileData } = updatedProfile!;

    return NextResponse.json({ 
      success: true, 
      message: 'Profile updated successfully',
      profile: profileData
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}

// DELETE - Delete user profile
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const db = await getDatabase();
    const profiles = db.collection('profiles');

    const result = await profiles.deleteOne({ email: session.user.email });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Profile deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting profile:', error);
    return NextResponse.json(
      { error: 'Failed to delete profile' },
      { status: 500 }
    );
  }
}

