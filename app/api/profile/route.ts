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

    // Add timeout for database operations
    const db = await Promise.race([
      getDatabase(),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Database connection timeout')), 8000)
      )
    ]);

    const profiles = db.collection('profiles');
    
    const profile = await Promise.race([
      profiles.findOne({ email: session.user.email }),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Database query timeout')), 5000)
      )
    ]);
    
    if (!profile) {
      return NextResponse.json({ profile: null });
    }

    // Remove _id from response
    const { _id, ...profileData } = profile;
    return NextResponse.json({ profile: profileData });
  } catch (error) {
    console.error('Error fetching profile:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch profile';
    return NextResponse.json(
      { error: errorMessage },
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

    // Add timeout for database operations
    const db = await Promise.race([
      getDatabase(),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Database connection timeout')), 8000)
      )
    ]);

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
    const result = await Promise.race([
      profiles.updateOne(
        { email: session.user.email },
        { 
          $set: updateData,
          $setOnInsert: { createdAt: new Date() }
        },
        { upsert: true }
      ),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Database update timeout')), 5000)
      )
    ]);

    // Fetch the updated/created profile
    const savedProfile = await Promise.race([
      profiles.findOne({ email: session.user.email }),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Database query timeout')), 5000)
      )
    ]);

    if (!savedProfile) {
      return NextResponse.json(
        { error: 'Failed to retrieve saved profile' },
        { status: 500 }
      );
    }

    const { _id, ...profileData } = savedProfile;
    return NextResponse.json({ 
      success: true, 
      message: 'Profile saved successfully',
      profile: profileData
    });
  } catch (error) {
    console.error('Error saving profile:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to save profile';
    return NextResponse.json(
      { error: errorMessage },
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

    // Add timeout for database operations
    const db = await Promise.race([
      getDatabase(),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Database connection timeout')), 8000)
      )
    ]);

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

    const result = await Promise.race([
      profiles.updateOne(
        { email: session.user.email },
        { $set: updateData }
      ),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Database update timeout')), 5000)
      )
    ]);

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    const updatedProfile = await Promise.race([
      profiles.findOne({ email: session.user.email }),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Database query timeout')), 5000)
      )
    ]);

    if (!updatedProfile) {
      return NextResponse.json(
        { error: 'Failed to retrieve updated profile' },
        { status: 500 }
      );
    }

    const { _id, ...profileData } = updatedProfile;
    return NextResponse.json({ 
      success: true, 
      message: 'Profile updated successfully',
      profile: profileData
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
    return NextResponse.json(
      { error: errorMessage },
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

    // Add timeout for database operations
    const db = await Promise.race([
      getDatabase(),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Database connection timeout')), 8000)
      )
    ]);

    const profiles = db.collection('profiles');

    const result = await Promise.race([
      profiles.deleteOne({ email: session.user.email }),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Database delete timeout')), 5000)
      )
    ]);

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
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete profile';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

